import { Button, Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { TbAt, TbUserCircle, TbLock } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { ReactNode } from 'react';

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
        key: 'first_name',
        icon: <TbUserCircle />,
        type: 'text',
        placeholder: 'First Name',
        validation: { required: 'Please provide your first name' },
    },
    {
        key: 'last_name',
        icon: <TbUserCircle />,
        type: 'text',
        placeholder: 'Last Name',
        required: true,
        validation: { required: 'Please provide your last name' },
    },
    {
        key: 'password',
        icon: <TbLock />,
        type: 'password',
        placeholder: 'Password',
        validation: { required: 'Please provide your password' },
    },
    {
        key: 'confirm_password',
        icon: <TbLock />,
        type: 'password',
        placeholder: 'Confirm password',
        validation: { required: 'Please confirm your password' },
    },
]

export default function Form() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    function handleRegister(values) {
        console.log(values);
    }

    return (
        <Box as="form" onSubmit={handleSubmit(handleRegister)} noValidate animation="homeForm .2s 1 0s ease-out">
            {fields.map((field) => (
                <FormControl key={field.key} pb="1rem" isInvalid={!!errors[field.key]}>
                    <InputGroup>
                        <InputLeftElement color={errors[field.key] ? 'red' : 'black'}>{field.icon}</InputLeftElement>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            autoComplete="none"
                            {...register(field.key, { ...field.validation })}
                        />
                    </InputGroup>
                    <FormErrorMessage fontSize="xs">{(errors[field.key] ? errors[field.key].message : null) as unknown as ReactNode}</FormErrorMessage>
                </FormControl>
            ))}

            <Button colorScheme="blue" w="100%" variant='solid' isLoading={isSubmitting} loadingText='Submitting' type="submit">
                Sign up
            </Button>
        </Box>
    )
}
