import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TbAt, TbLock } from 'react-icons/tb';
import { login } from '@/apis/auth';
import { COOKIE_OPTIONS, ERROR_TOAST_PARAMS } from '@/utils/constants';

const fields = [
    {
        key: 'email',
        icon: <TbAt />,
        type: 'email',
        placeholder: 'Email Address',
        validation: {
            required: 'Please provide your email address',
            pattern: { value: /^\S+@\S+$/i, message: 'Please provide a valid email address' },
        },
    },
    {
        key: 'password',
        icon: <TbLock />,
        type: 'password',
        placeholder: 'Password',
        validation: { required: 'Please provide your password' },
    },
];

export default function Form() {
    const [posting, setPosting] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { push } = useRouter();
    const toast = useToast();

    async function handleLogin(values) {
        try {
            setPosting(true);

            const result = await login(values);

            if (result.status === 200) {
                const cookie = new Cookies();
                cookie.set('token', result.data.token, COOKIE_OPTIONS);
                push('/_/welcome');
            } else {
                throw new Error('Something wrong');
            }
        } catch (error) {
            console.log(error);
            toast({ ...ERROR_TOAST_PARAMS, description: error.response?.data.message || 'Internal server error' });
            setPosting(false);
        }
    }

    return (
        <Box id="login_form" as="form" onSubmit={handleSubmit(handleLogin)} noValidate animation="homeForm 1s 1 0s ease-out">
            {fields.map((field) => (
                <FormControl key={field.key} pb="1rem" isInvalid={!!errors[field.key]}>
                    <InputGroup>
                        <InputLeftElement color={errors[field.key] ? 'red' : 'black'}>{field.icon}</InputLeftElement>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            id={`login_${field.key}`}
                            autoComplete="off"
                            bg="white"
                            {...register(field.key, { ...field.validation })}
                        />
                    </InputGroup>
                    <FormErrorMessage fontSize="xs">{(errors[field.key] ? errors[field.key].message : null) as unknown as ReactNode}</FormErrorMessage>
                </FormControl>
            ))}

            <Button id="login" colorScheme="blue" w="100%" variant="solid" isLoading={posting} disabled={posting} loadingText="Logging in..." type="submit">
                Log in
            </Button>
        </Box>
    );
}
