import { useRef, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, FormLabel, DrawerFooter, Box, FormControl, Switch, useToast } from '@chakra-ui/react';
import { createCategory, editCategory, useCategories } from '@/apis/category';
import { useSettings } from '@/apis/setting';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS } from '@/utils/constants';
import { ModelCategory } from '@/models/category';
import { useStore } from '@/store';
import Name from './fields/name';
import Description from './fields/description';

interface CategoryForm {
    children: any;
    title: string;
    mode?: 'add' | 'edit';
    item?: ModelCategory | null;
    mutate?: () => void;
}

export default function Form({ children, title, mode = 'add', item = null }: CategoryForm) {
    const { paginate: { skip, limit }, filters } = useStore((state) => state.category);
    const { mutate } = useCategories({ skip, limit, filters });
    const { isOpen, onOpen, onClose } = useDisclosure({ id: `${mode}_category_form` });
    const toast = useToast();
    const nameRef = useRef();
    const { data: settings } = useSettings();
    const [posting, setPosting] = useState(false);

    const defaultValues = useMemo(() => {
        const locales = settings?.locales || [];

        if (mode === 'edit') {
            return {
                original_name: item?.original_name,
                ...locales.reduce((acc, locale) => ({ ...acc, [`name_${locale}`]: item?.content.find(item => item.locale === locale).name }), {}),
                ...locales.reduce((acc, locale) => ({ ...acc, [`description_${locale}`]: item?.content.find(item => item.locale === locale).description }), {}),
                status: item?.status,
            };
        }

        return {
            original_name: '',
            ...locales.reduce((acc, locale) => ({ ...acc, [`name_${locale}`]: '' }), {}),
            ...locales.reduce((acc, locale) => ({ ...acc, [`description_${locale}`]: '' }), {}),
            status: true,
        };
    }, [settings?.locales, mode, item?.original_name, item?.status, item?.content]);

    const { handleSubmit, register, reset, formState: { errors } } = useForm({ defaultValues });

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
            const locales = settings?.locales || [];

            const body = {
                original_name: values.original_name,
                content: locales.map((locale) => ({
                    locale,
                    name: values[`name_${locale}`],
                    description: values[`description_${locale}`],
                })),
                status: values.status,
            };

            if (mode === 'add') {
                response = await createCategory(body);
            } else if (mode === 'edit') {
                response = await editCategory({ ...body, category_id: item._id });
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
                                <Name register={register} errors={errors} />
                                <Description register={register} errors={errors} />

                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="category_status" mb="0">Status</FormLabel>
                                    <Switch id="category_status" {...register('status')} />
                                </FormControl>
                            </Stack>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button id="cancel_button" variant="outline" mr={3} onClick={handleClose}>Cancel</Button>
                        <Button
                            id="save_button"
                            colorScheme="blue"
                            form="category_form"
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
