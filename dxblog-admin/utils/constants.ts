import type { UseToastOptions } from '@chakra-ui/react';

export const COOKIE_OPTIONS =  { path: '/', sameSite: true };

export const SUCCESS_TOAST_PARAMS: UseToastOptions = {
    id: 'success',
    title: 'Success',
    description: 'Something cool is happening 😃',
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'top',
};

export const ERROR_TOAST_PARAMS: UseToastOptions = {
    id: 'error',
    title: 'Error',
    description: 'Something wrong is happened 😥',
    status: 'error',
    duration: 10000,
    isClosable: true,
    position: 'top',
};
