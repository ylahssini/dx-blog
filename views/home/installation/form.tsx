import { ReactNode, createRef, useState } from 'react';
import { Button, Box, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import fields from './fields';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '@/utils/functions';

export default function Form() {
    const [show, setShow] = useState(false);
    const [posting, setPosting] = useState(false);
    const { mutate } = useSWR(`${process.env.NEXT_PUBLIC_HOST}api/is-first-time`, fetcher);
    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm();

    function handleShow() {
        setShow(state => !state);
    }

    async function handleRegister(values) {
        try {
            setPosting(true);

            const result = await axios.post(`${process.env.NEXT_PUBLIC_HOST}api/instalation`, values);

            if (result.status === 202) {
                console.log('Success');
                reset();
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
        <Box as="form" onSubmit={handleSubmit(handleRegister)} noValidate animation="homeForm .2s 1 0s ease-out">
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
                                autoComplete="none"
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

            <Button colorScheme="blue" w="100%" variant="solid" isLoading={posting} loadingText="Creating the account..." type="submit">
                Sign up
            </Button>
        </Box>
    )
}
