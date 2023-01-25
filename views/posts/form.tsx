import { ReactNode, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, FormLabel, Input, DrawerFooter, Box, FormControl, FormErrorMessage, Switch, useToast } from '@chakra-ui/react';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS } from '@/utils/constants';
import { usePosts } from '@/apis/post';
import { useSettings } from '@/apis/setting';
import { ModelPost } from '@/models/post';
import { useStore } from '@/store';
import Editor from '@/components/entry/editor';
import ControlSelect from '@/components/entry/control-select';

interface PostForm {
    children: any;
    title: string;
    mode?: 'add' | 'edit';
    item?: ModelPost | null;
    mutate?: () => void;
}

const POST_STATUS_OPTIONS = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Disabled', value: 'DISABLED' },
    { label: 'Published', value: 'PUBLISHED' },
];

export default function Form({ children, title, mode = 'add', item = null }: PostForm) {
    // const { paginate: { skip, limit }, filters } = useStore((state) => state.post);
    // const { mutate } = usePosts({ skip, limit, filters });
    const { settings } = useSettings();
    const { control } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure({ id: mode + '_post_form' });
    // const toast = useToast();
    const [posting, setPosting] = useState(false);
    const titleRef = useRef();

    let defaultValues = {
        title: '',
        content: '',
        locale: '',
        path: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        extended_metas: [],
        equivalent_to_locale_post: '',
        status: 'DRAFT',
    };
    if (mode === 'edit') {
        defaultValues = {
            title: item.title,
            content: item.content,
            locale: item.locale,
            path: item.path,
            meta_title: item.meta.title,
            meta_description: item.meta.description,
            meta_keywords: item.meta.keywords,
            extended_metas: item.extended_metas,
            equivalent_to_locale_post: item.equivalent_to_locale_post,
            status: item.status,
        };
    }

    const { handleSubmit, register, reset, formState: { errors } } = useForm({ defaultValues });

    function resetMode() {
        if (mode === 'edit') {
            reset({}, { keepValues: true, keepDefaultValues: false });
        } else {
            reset();
        }
    }

    async function handleAdd(values) {
        /* try {
            setPosting(true);

            let response = null;

            if (mode === 'add') {
                response = await createCategory(values);
            } else if (mode === 'edit') {
                response = await editCategory({ ...values, post_id: item._id });
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
        } */
    }

    function handleClose() {
        setPosting(false);
        onClose();
        resetMode();
    }

    return (
        <aside>
            {children({ onOpen })}

            <Drawer isOpen={isOpen} placement="right" initialFocusRef={titleRef} onClose={onClose} size="lg">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

                    <DrawerBody pt="1rem">
                        <Box id="post_form" as="form" onSubmit={handleSubmit(handleAdd)} noValidate>
                            <Stack spacing="24px">
                                <FormControl isInvalid={!!errors.title} isRequired>
                                    <FormLabel htmlFor="post_title">Title</FormLabel>
                                    <Input ref={titleRef} id="post_title" name="title" autoComplete="off" {...register('title', { required: 'Please provide the title of post' })} />
                                    <FormErrorMessage fontSize="xs">{(errors.title ? errors.title.message : null) as unknown as ReactNode}</FormErrorMessage>
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="post_content">Content</FormLabel>
                                    <Controller
                                        render={({ field: f }: any) => <Editor name="post_content" id="post_content" {...f} />}
                                        control={control}
                                        {...register('content')}
                                    />
                                </FormControl>

                                <FormControl isInvalid={!!errors.path} isRequired>
                                    <FormLabel htmlFor="post_path">Path</FormLabel>
                                    <Input id="post_path" name="title" autoComplete="off" {...register('path', { required: 'Please provide the path of post' })} />
                                    <FormErrorMessage fontSize="xs">{(errors.path ? errors.path.message : null) as unknown as ReactNode}</FormErrorMessage>
                                </FormControl>

                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="post_status" mb="0">Status</FormLabel>
                                    <Controller
                                        render={({ field: f }: any) => (
                                            <Select
                                                placeholder="Select"
                                                classNamePrefix="entry-select"
                                                className="entry-select-container"
                                                options={POST_STATUS_OPTIONS}
                                                id="status"
                                                components={{ Control: ControlSelect }}
                                                {...f}
                                            />
                                        )}
                                        control={control}
                                        {...register('status')}
                                    />
                                </FormControl>
                            </Stack>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button id="cancel_button" variant="outline" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            id="save_button"
                            colorScheme="blue"
                            form="post_form"
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
