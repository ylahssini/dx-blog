import { ReactNode, createRef, useState } from 'react';
import { Button, Box, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { createAdminUser, useFirstInstallTime } from '@/apis/auth';
import fields from './fields';

export default function Form() {
    const [show, setShow] = useState(false);
    const [posting, setPosting] = useState(false);
    const { mutate } = useFirstInstallTime();
    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm();
    const toast = useToast();

    function handleShow() {
        setShow(state => !state);
    }

    async function handleRegister(values) {
        try {
            setPosting(true);

            const result = await createAdminUser(values);

            if (result.status === 202) {
                reset();

                toast({
                    status: 'success',
                    title: 'Success',
                    description: 'Your account is created',
                    duration: 5000,
                    isClosable: true,
                });
                setPosting(false);

                mutate();
            }
        } catch (e) {
            console.log(e);
            setPosting(false);
        }
    }

    const refs: Record<string, any> = {};
    fields.forEach((field) => {
        refs[field.key] = createRef();

        if (field.key === 'password') {
            refs[field.key].current = watch('password', '');
        }
    });

    return (
        <Box id="installation_form" as="form" onSubmit={handleSubmit(handleRegister)} noValidate animation="homeForm 1s 1 0s ease-out">
            {fields.map((field) => {
                let validate = null;
                if (field.key === 'confirm_password') {
                    validate = (value) => refs.password.current !== value ? 'The two passwords are not matched' : null;
                }

                return (
                    <FormControl key={field.key} pb="1rem" isInvalid={!!errors[field.key]}>
                        <InputGroup>
                            <InputLeftElement color={errors[field.key] ? 'red' : 'black'}>{field.icon}</InputLeftElement>
                            <Input
                                ref={refs[field.key]}
                                type={field.type === 'password' && show ? 'text' : field.type}
                                placeholder={field.placeholder}
                                id={`installation_${field.key}`}
                                autoComplete="off"
                                {...register(field.key, { ...field.validation, validate })}
                            />
                            {field.key === 'password' ? (
                                <InputRightElement width="3rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShow}>
                                        {show ? <TbEyeOff /> : <TbEye />}
                                    </Button>
                              </InputRightElement>
                            ) : null}
                        </InputGroup>
                        <FormErrorMessage fontSize="xs">{(errors[field.key] ? errors[field.key].message : null) as unknown as ReactNode}</FormErrorMessage>
                    </FormControl>
                );
            })}

            <Button id="signup" colorScheme="blue" w="100%" variant="solid" isLoading={posting} disabled={posting} loadingText="Creating the account..." type="submit">
                Sign up
            </Button>
        </Box>
    );
}
