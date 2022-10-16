import { ReactNode, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    useDisclosure,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    FormLabel,
    Input,
    Textarea,
    DrawerFooter,
    Box,
    FormControl,
    FormErrorMessage,
    Switch,
    useToast
} from '@chakra-ui/react';
import { createCategory, editCategory, useCategories } from '@/apis/category';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS } from '@/utils/constants';
import { ModelCategory } from '@/models/category';
import { useStore } from '@/store';

interface CategoryForm {
    children: any;
    title: string;
    mode?: 'add' | 'edit';
    item?: ModelCategory | null;
    mutate?: () => void;
}

export default function Form({ children, title, mode = 'add', item = null }: CategoryForm) {
    const { skip } = useStore((state) => state.category.paginate);
    const { mutate } = useCategories({ skip });
    const { isOpen, onOpen, onClose } = useDisclosure({ id: 'category_' + mode });
    const toast = useToast();
    const nameRef = useRef();
    const [posting, setPosting] = useState(false);

    let defaultValues = { name: '', description: '', status: true };
    if (mode === 'edit') {
        defaultValues = {
            name: item.name,
            description: item.description,
            status: item.status,
        };
    }

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({ defaultValues });

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

            if (mode === 'add') {
                response = await createCategory(values);
            } else if (mode === 'edit') {
                response = await editCategory({ ...values, category_id: item._id });
            }

            if (response?.status === 202) {
                resetMode();

                const description = mode === 'add' ? `The category '${values.name}' is created` : `The category '${values.name}' is edited`;
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

            <Drawer isOpen={isOpen} placement="right" initialFocusRef={nameRef} onClose={onClose} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

                    <DrawerBody pt="1rem">
                        <Box id="category_form" as="form" onSubmit={handleSubmit(handleAdd)} noValidate>
                            <Stack spacing="24px">
                                <FormControl isInvalid={!!errors.name} isRequired>
                                    <FormLabel htmlFor="category_name">Name</FormLabel>
                                    <Input
                                        ref={nameRef}
                                        id="category_name"
                                        name="name"
                                        autoComplete="off"
                                        {...register('name', { required: 'Please provide the name of category' })}
                                    />
                                    <FormErrorMessage fontSize="xs">{(errors.name ? errors.name.message : null) as unknown as ReactNode}</FormErrorMessage>
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="category_description">Description</FormLabel>
                                    <Textarea
                                        name="category_description"
                                        id="category_description"
                                        resize="vertical"
                                        {...register('description')}
                                    />
                                </FormControl>

                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="category_status" mb="0">Status</FormLabel>
                                    <Switch id="category_status" {...register('status')} />
                                </FormControl>
                            </Stack>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" form="category_form" variant="solid" isLoading={posting} disabled={posting} loadingText="Sending data..." type="submit">
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </aside>
    );
}
