import { ReactNode, createRef, useState } from 'react';
import { Button, Box, Input, InputGroup, InputLeftElement, InputRightElement, useToast, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import ControlSelect from '@/components/entry/control-select';
import { createAdminUser, useFirstInstallTime } from '@/apis/auth';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS, USER_PERMISSIONS } from '@/utils/constants';
import Locales from '@/assets/data/locales-codes.json';
import fields from './fields';

const locales = Object.entries(Locales).map(([value, label]) => ({ label: `${label} (${value})`, value }));

export default function Form() {
    const [show, setShow] = useState(false);
    const [posting, setPosting] = useState(false);
    const { mutate } = useFirstInstallTime();
    const { handleSubmit, register, formState: { errors }, watch, reset, control } = useForm();
    const toast = useToast();

    function handleShow() {
        setShow(state => !state);
    }

    async function handleRegister(values) {
        try {
            setPosting(true);

            const result = await createAdminUser({
                ...values,
                roles: Object.entries(USER_PERMISSIONS).map(([section, permissions]) => ({ section, permissions })),
                locales: values.locales.map((locale) => locale.value),
            });

            if (result.status === 202) {
                reset();

                toast({ ...SUCCESS_TOAST_PARAMS, description: 'Your account is created' });
                setPosting(false);

                mutate();
            }
        } catch (error) {
            console.log(error);
            toast({ ...ERROR_TOAST_PARAMS, description: error?.response.data.message || 'Something wrong' });
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
                    <FormControl key={field.key} pb="1rem" isInvalid={!!errors[field.key]} position="relative" zIndex={2}>
                        <InputGroup>
                            {field.type !== 'select' && <InputLeftElement color={errors[field.key] ? 'red' : 'black'}>{field.icon}</InputLeftElement>}
                            {
                                field.type === 'select' ? (
                                    <Controller
                                        name={field.key}
                                        rules={{ ...field.validation, validate }}
                                        render={({ field: f }: any) => (
                                            <Select
                                                placeholder={field.placeholder}
                                                classNamePrefix="entry-select"
                                                className="entry-select-container"
                                                isMulti
                                                options={locales}
                                                id={`installation_${field.key}`}
                                                components={{ Control: ControlSelect }}
                                                icon={field.icon}
                                                {...f}
                                            />
                                        )}
                                        control={control}
                                    />
                                ) : (
                                    <Input
                                        ref={refs[field.key]}
                                        type={field.type === 'password' && show ? 'text' : field.type}
                                        placeholder={field.placeholder}
                                        id={`installation_${field.key}`}
                                        autoComplete="off"
                                        bg="white"
                                        {...register(field.key, { ...field.validation, validate })}
                                    />
                                )
                            }
                            
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

            <Button
                id="signup"
                colorScheme="blue"
                w="100%"
                variant="solid"
                isLoading={posting}
                disabled={posting}
                loadingText="Creating the account..."
                type="submit"
                position="relative"
                zIndex={1}
            >
                Sign up
            </Button>
        </Box>
    );
}
