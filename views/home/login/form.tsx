import React, { ReactNode, useState } from 'react';
import Router from 'next/router';
import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TbAt, TbLock } from 'react-icons/tb';
import { login } from '@/apis/auth';

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
    const toast = useToast();

    async function handleLogin(values) {
        try {
            setPosting(true);

            const result = await login(values);

            if (result.status === 200) {
                console.log('here');
                Router.push('/dashboard/');
            }
        } catch (error) {
            console.log(error);
            toast({
                id: 'error',
                title: 'Error',
                description: error.response.data.message,
                status: 'error',
                duration: 8000,
                isClosable: true,
                position: 'top',
            });
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
