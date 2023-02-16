import { useToast, Box, Stack, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { useEffect, ReactNode, useMemo, useReducer, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useBlogPosts, addBlogPost, editBlogPost } from '@/apis/blogpost';
import { getCategories } from '@/apis/category';
import { useSettings } from '@/apis/setting';
import ControlSelect from '@/components/entry/control-select';
import Editor from '@/components/entry/editor';
import { useStore } from '@/store';
import Locales from '@/assets/data/locales-codes.json';
import { SUCCESS_TOAST_PARAMS, ERROR_TOAST_PARAMS } from '@/utils/constants';
import { mergingReducer } from '@/utils/functions';
import { useRouter } from 'next/router';

const POST_STATUS_OPTIONS = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Disabled', value: 'DISABLED' },
    { label: 'Published', value: 'PUBLISHED' },
];

const BlogPostForm = ({ mode }: { mode: 'add' | 'edit' }) => {
    const { paginate: { skip, limit }, populate, filters } = useStore((state) => state.post);
    const { data, mutate } = useBlogPosts({ skip, limit, filters, populate });
    const { data: settings } = useSettings();
    const { query, push } = useRouter();
    const [store, updateStore] = useReducer(mergingReducer, { posting: false, categoryLoaded: null });
    const titleRef = useRef();
    const toast = useToast();

    const item = (data?.list.items || []).find((i) => i._id === query.id && mode === 'edit');

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
        category: '',
        status: '',
    };
    if (mode === 'edit' && item) {
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
            category: item.category_id,
            status: item.status,
        };
    }

    useEffect(() => {
        async function loadCategory(id) {
            const result = await getCategories({ filter: JSON.stringify({ id }) });
            updateStore({ categoryLoaded: result.data.list.items.map((item) => ({ value: item._id, label: item.name })) }) ;
        }
    
        if (!store.categoryLoaded && item?.category_id) {
            loadCategory(item.category_id);
        }
    }, [item, store.categoryLoaded]);

    const { handleSubmit, register, reset, control, formState: { errors } } = useForm({ defaultValues });

    const selectProps = {
        placeholder: 'Select',
        classNamePrefix: 'entry-select',
        className: '',
        components: { Control: ControlSelect },
    };

    async function handleLoad(value) {
        const result = await getCategories({ filter: JSON.stringify({ name: value }) });
        return result.data.list.items.map((item) => ({ value: item._id, label: item.name }));
    }

    function handleReset() {
        if (mode === 'edit') {
            reset({}, { keepValues: true, keepDefaultValues: false });
        } else {
            reset();
        }
    }

    async function handleAdd(values) {
        try {
            updateStore({ posting: true });

            let response = null;

            const body = {
                title: values.title,
                content: values.content,
                locale: values.locale.value,
                path: values.path,
                category: values.category?.value,
                status: values.status,
                meta_title: values.title,
                meta_description: values.title,
            };

            if (mode === 'add') {
                response = await addBlogPost(body);
            } else if (mode === 'edit') {
                response = await editBlogPost({ ...body, blogpost_id: item._id });
            }

            if (response?.status === 202) {
                handleReset();

                const description = mode === 'add' ? `The post '${values.title}' is created` : `The post '${values.title}' is edited`;
                toast({ ...SUCCESS_TOAST_PARAMS, description });

                mutate();
                push('/_/posts');
            } else {
                toast({ ...ERROR_TOAST_PARAMS, description: response?.data.message || 'Internal server error' });
            }

            updateStore({ posting: false });
        } catch (error) {
            console.log(error);
            toast({ ...ERROR_TOAST_PARAMS, description: error.response?.data.message || 'Internal server error' });
            updateStore({ posting: false });
        }
    }

    function handleClose() {
        updateStore({ posting: false });
        handleReset();
        push('/_/posts');
    }

    const locales = useMemo(() => {
        return (settings?.locales || []).map((locale) => ({ value: locale, label: Locales[locale] }));
    }, [settings?.locales]);

    return (
        <Box p="2rem">
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

                    {
                        locales.length > 0 && (
                            <FormControl isInvalid={!!errors.locale} isRequired>
                                <FormLabel htmlFor="post_locale">Locale</FormLabel>
                                <Controller
                                    render={({ field: f }: any) => <Select options={locales} id="locale" {...selectProps} {...f} value={locales.find(c => c.value === f.value)} />}
                                    control={control}
                                    onChange={(val: { value: string }) => console.log(val)}
                                    {...register('locale', { required: 'Please select the language' })}
                                />
                                <FormErrorMessage fontSize="xs">{(errors.locale ? errors.locale.message : null) as unknown as ReactNode}</FormErrorMessage>
                            </FormControl>
                        )
                    }

                    <FormControl isInvalid={!!errors.path} isRequired>
                        <FormLabel htmlFor="post_path">Path</FormLabel>
                        <Input id="post_path" name="path" autoComplete="off" {...register('path', { required: 'Please provide the path of post' })} />
                        <FormErrorMessage fontSize="xs">{(errors.path ? errors.path.message : null) as unknown as ReactNode}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.status} isRequired>
                        <FormLabel htmlFor="post_status">Status</FormLabel>
                        <Controller
                            render={({ field: f }: any) => (
                                <Select
                                    options={POST_STATUS_OPTIONS}
                                    id="status"
                                    {...selectProps}
                                    {...f}
                                    value={POST_STATUS_OPTIONS.find(c => c.value === f.value)}
                                    onChange={(val: { value: string }) => f.onChange(val.value)}
                                />
                            )}
                            control={control}
                            {...register('status', { required: 'Please select a status' })}
                        />
                        <FormErrorMessage fontSize="xs">{(errors.status ? errors.status.message : null) as unknown as ReactNode}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="post_category">Category</FormLabel>
                        <Controller
                            render={({ field: f }: any) => (
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={handleLoad}
                                    defaultOptions={store.categoryLoaded || []}
                                    id="category"
                                    {...selectProps}
                                    className=""
                                    {...f}
                                    value={(store.categoryLoaded || []).find(c => c.value === f.value)}
                                />
                            )}
                            control={control}
                            {...register('category')}
                        />
                    </FormControl>
                </Stack>
            </Box>

            <Box display="flex" justifyContent="end" py="10">
                <Button id="cancel_button" variant="outline" mr={3} onClick={handleClose}>Cancel</Button>
                <Button
                    id="save_button"
                    colorScheme="blue"
                    form="post_form"
                    variant="solid"
                    isLoading={store.posting}
                    disabled={store.posting}
                    loadingText="Sending data..."
                    type="submit"
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default BlogPostForm;
