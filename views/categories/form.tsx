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
import { MdOutlineControlPoint } from 'react-icons/md';
import { createCategory } from '@/apis/category';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS } from '@/utils/constants';

export default function Form() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();
    const nameRef = useRef();
    const [posting, setPosting] = useState(false);

    async function handleAdd(values) {
        try {
            setPosting(true);

            const response = await createCategory(values);

            if (response.status === 202) {
                reset();

                toast({ ...SUCCESS_TOAST_PARAMS, description: 'Your account is created' });
                onClose();

                setPosting(false);
            }
        } catch (error) {
            console.log(error);
            toast({ ...ERROR_TOAST_PARAMS, description: error.response.data.message });
            setPosting(false);
        }
    }

    function handleClose() {
        onClose();
        reset();
    }

    return (
        <aside>
            <Button colorScheme="blue" size="sm" leftIcon={<MdOutlineControlPoint size={18} />} onClick={onOpen}>
                Add a new category
            </Button>

            <Drawer isOpen={isOpen} placement="right" initialFocusRef={nameRef} onClose={onClose} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Add a new category</DrawerHeader>

                    <DrawerBody pt="1rem">
                        <Box id="add_new_category_form" as="form" onSubmit={handleSubmit(handleAdd)} noValidate>
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
                        <Button colorScheme="blue" form="add_new_category_form" variant="solid" isLoading={posting} disabled={posting} loadingText="sending data..." type="submit">
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </aside>
    );
}
