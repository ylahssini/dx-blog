import React, { ReactNode, useState } from 'react';
import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TbAt, TbLock } from 'react-icons/tb';

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
        validation: {
            required: 'Please provide your password',
            pattern: { value: /(?=(?:.*\d){1,})/g, message: 'Please add at least one number in your password' }
        },
    },
];

export default function Form() {
    const [posting, setPosting] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();

    async function handleLogin(values) {
        setPosting(false);
        console.log(values);
    }

    return (
        <Box as="form" onSubmit={handleSubmit(handleLogin)} noValidate animation="homeForm 1s 1 0s ease-out">
            {fields.map((field) => (
                <FormControl key={field.key} pb="1rem" isInvalid={!!errors[field.key]}>
                    <InputGroup>
                        <InputLeftElement color={errors[field.key] ? 'red' : 'black'}>{field.icon}</InputLeftElement>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete="off"
                            {...register(field.key, { ...field.validation })}
                        />
                    </InputGroup>
                    <FormErrorMessage fontSize="xs">{(errors[field.key] ? errors[field.key].message : null) as unknown as ReactNode}</FormErrorMessage>
                </FormControl>
            ))}

            <Button colorScheme="blue" w="100%" variant="solid" isLoading={posting} loadingText="Logging in..." type="submit">
                Log in
            </Button>
        </Box>
    )
}