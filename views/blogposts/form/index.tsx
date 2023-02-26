import { useMemo, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useToast, Box, Stack, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useBlogPosts, addBlogPost, editBlogPost } from '@/apis/blogpost';
import { useSettings } from '@/apis/setting';
import ControlSelect from '@/components/entry/control-select';
import { useStore } from '@/store';
import { SUCCESS_TOAST_PARAMS, ERROR_TOAST_PARAMS } from '@/utils/constants';
import { mergingReducer } from '@/utils/functions';
import Status from './fields/status';
import Category from './fields/category';
import Path from './fields/path';
import Content from './fields/content';
import Title from './fields/title';

export const selectProps = {
    placeholder: 'Select',
    classNamePrefix: 'entry-select',
    className: '',
    components: { Control: ControlSelect },
};

const BlogPostForm = ({ mode }: { mode: 'add' | 'edit' }) => {
    const { paginate: { skip, limit }, populate, filters } = useStore((state) => state.post);
    const { data: settings } = useSettings();
    const { data, mutate } = useBlogPosts({ skip, limit, filters, populate });
    const { query, push } = useRouter();
    const [store, updateStore] = useReducer(mergingReducer, { posting: false });
    const toast = useToast();

    const item = (data?.list.items || []).find((i) => i._id === query.id && mode === 'edit');

    const defaultValues = useMemo(() => {
        const locales = settings?.locales || [];

        if (mode === 'edit' && item) {
            return {
                original_title: item.original_title,
                ...locales.reduce((acc, locale) => ({ ...acc, [`title_${locale}`]: item.content.find(item => item.locale === locale).title }), {}),
                ...locales.reduce((acc, locale) => ({ ...acc, [`content_${locale}`]: item.content.find(item => item.locale === locale).body }), {}),
                ...locales.reduce((acc, locale) => ({ ...acc, [`path_${locale}`]: item.content.find(item => item.locale === locale).path }), {}),
                meta_title: item.meta?.title,
                meta_description: item.meta?.description,
                meta_keywords: item.meta?.keywords,
                extended_metas: item.extended_metas,
                category: item.category_id,
                status: item.status,
            };
        }

        return {
            original_title: '',
            ...locales.reduce((acc, locale) => ({ ...acc, [`title_${locale}`]: '' }), {}),
            ...locales.reduce((acc, locale) => ({ ...acc, [`content_${locale}`]: '' }), {}),
            ...locales.reduce((acc, locale) => ({ ...acc, [`path_${locale}`]: '' }), {}),
            meta_title: '',
            meta_description: '',
            meta_keywords: '',
            extended_metas: [],
            category: '',
            status: '',
        };
    }, [item, mode, settings?.locales]);

    const locales = settings?.locales || [];

    const { handleSubmit, register, reset, control, formState: { errors } } = useForm({ defaultValues });

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
                original_title: values.original_title,
                content: locales.map((locale) => ({
                    locale,
                    title: values[`title_${locale}`],
                    path: values[`path_${locale}`],
                    body: values[`content_${locale}`],
                })),
                meta_title: values.original_title,
                meta_description: values.original_title,
                category: values.category?.value,
                status: values.status,
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

    return (
        <Box p="2rem">
            <Box id="post_form" as="form" onSubmit={handleSubmit(handleAdd)} noValidate>
                <Stack spacing="24px">
                    <Title register={register} errors={errors} />
                    <Content register={register} control={control} />
                    <Path register={register} errors={errors} />
                    <Status register={register('status', { required: 'Please select a status' })} errors={errors} control={control} />
                    <Category register={register('category')} blogpost={item} control={control} />
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
