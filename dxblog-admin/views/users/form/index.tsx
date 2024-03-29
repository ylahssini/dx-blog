import { ReactNode, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, FormLabel, Input, DrawerFooter, Box, FormControl, FormErrorMessage, Switch, useToast } from '@chakra-ui/react';
import { createUser, editUser, useUsers } from '@/apis/user';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS } from '@/utils/constants';
import { ModelUser } from '@/models/user';
import { useStore } from '@/store';
import Fullname from './fields/fullname';
import Password from './fields/password';
import Roles from './fields/roles';

interface UserForm {
    children: any;
    title: string;
    mode?: 'add' | 'edit';
    item?: ModelUser | null;
    mutate?: () => void;
}

export default function Form({ children, title, mode = 'add', item = null }: UserForm) {
    const { paginate: { skip, limit }, filters } = useStore((state) => state.user);
    const { mutate } = useUsers({ skip, limit, filters });
    const { isOpen, onOpen, onClose } = useDisclosure({ id: `${mode}_user_form` });
    const toast = useToast();
    const [posting, setPosting] = useState(false);

    const defaultValues = useMemo(() => {
        if (mode === 'edit') {
            return {
                first_name: item.first_name,
                last_name: item.last_name,
                email: item.email,
                password: '',
                confirm_password: '',
                roles: item.roles.map((role) => ({ ...role, permissions: ['read', ...role.permissions] })),
                status: item.status,
            };
        }

        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            roles: [],
            status: true,
        };
    }, [item, mode]);

    const { handleSubmit, register, reset, formState: { errors }, watch, control } = useForm({ defaultValues });

    function resetMode() {
        if (mode === 'edit') {
            reset({}, { keepValues: true, keepDefaultValues: false });
        } else {
            reset();
        }
    }

    async function handleAdd(values) {
        try {
            setPosting(true);

            let response = null;
            const body = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                roles: values.roles.map((role) => ({ ...role, permissions: role.permissions.filter((r) => r !== 'read') })),
                status: values.status,
            };

            if (mode === 'add') {
                response = await createUser(body);
            } else if (mode === 'edit') {
                if (body.password === '') {
                    body.password = undefined;
                }

                response = await editUser({ ...body, user_id: item._id });
            }

            if (response?.status === 202) {
                resetMode();

                const full_name = `${values.first_name} ${values.last_name}`;
                const description = mode === 'add' ? `The user '${full_name}' is created` : `The user '${full_name}' is edited`;
                toast({ ...SUCCESS_TOAST_PARAMS, description });

                mutate();
                onClose();
            } else {
                toast({ ...ERROR_TOAST_PARAMS, description: response?.data.message || 'Internal server error' });
            }

            setPosting(false);
        } catch (error) {
            console.log(error);
            toast({ ...ERROR_TOAST_PARAMS, description: error.response?.data.message || 'Internal server error' });
            setPosting(false);
        }
    }

    function handleClose() {
        setPosting(false);
        onClose();
        resetMode();
    }

    return (
        <aside>
            {children({ onOpen })}

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

                    <DrawerBody pt="1rem">
                        <Box id="user_form" as="form" onSubmit={handleSubmit(handleAdd)} noValidate>
                            <Stack spacing="24px">
                                <Fullname register={register} errors={errors} />

                                <FormControl isInvalid={!!errors.email} isRequired>
                                    <FormLabel htmlFor="email">Email address</FormLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        {...register('email', {
                                            required: 'Please provide the email address',
                                            pattern: { value: /^\S+@\S+$/i, message: 'Please provide a valid email address' },
                                        })}
                                    />
                                    <FormErrorMessage fontSize="xs">{(errors.email ? errors.email.message : null) as unknown as ReactNode}</FormErrorMessage>
                                </FormControl>

                                <Password mode={mode} password={watch('password')} register={register} errors={errors} />

                                <Roles control={control} />

                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="user_status" mb="0">Status</FormLabel>
                                    <Switch id="user_status" {...register('status')} />
                                </FormControl>
                            </Stack>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button id="cancel_button" variant="outline" mr={3} onClick={handleClose}>Cancel</Button>
                        <Button
                            id="save_button"
                            colorScheme="blue"
                            form="user_form"
                            variant="solid"
                            isLoading={posting}
                            disabled={posting}
                            loadingText="Sending data..."
                            type="submit"
                        >
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </aside>
    );
}
