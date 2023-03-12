import { ReactNode, useMemo, useState } from 'react';
import { Box, Text, FormControl, FormErrorMessage, FormLabel, HStack, Input, Switch, Button, useToast } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { MdOutlineSave, MdOutlineUploadFile } from 'react-icons/md';
import { editSettings, useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';
import { ERROR_TOAST_PARAMS, SUCCESS_TOAST_PARAMS } from '@/utils/constants';
import Image from 'next/image';

const localeList = Object.entries(Locales).map(([value, label]) => ({ value, label }));

const SettingsForm = () => {
    const { data: settings } = useSettings();
    const locales = useMemo(() => (settings?.locales || []).map((locale) => ({ value: locale, label: Locales[locale] })), [settings?.locales]);
    const { handleSubmit, register, formState: { errors }, control, setValue, watch } = useForm({
        defaultValues: {
            title: settings.title,
            locales,
            logo: settings.logo,
            under_construction: settings.under_construction,
            under_maintenance: settings.under_maintenance,
        }
    });
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    function handleUpload(event) {
        if (event.target.files && event.target.files.length > 0) {
            const [file] = event.target.files;
            setValue('logo', URL.createObjectURL(file));
            setSelectedFile(file);
        }
    }

    async function handleSettings(values) {
        try {
            setLoading(true);

            const body = new FormData();

            body.append('title', values.title);
            body.append('locales', values.locales.map(v => v.value));
            body.append('under_construction', values.under_construction);
            body.append('under_maintenance', values.under_maintenance);
            body.append('logo', selectedFile);

            const response = await editSettings(body);

            if (response.status === 202) {
                toast({ ...SUCCESS_TOAST_PARAMS, description: 'The settings are saved' });
            } else {
                toast({ ...ERROR_TOAST_PARAMS, description: response?.data.message || 'Internal server error' });
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast({ ...ERROR_TOAST_PARAMS, description: error.response?.data.message || error?.message || 'Internal server error' });
        }
    }

    const logo = watch('logo');

    return (
        <Box pb="3rem">
            <HStack id="settings_form" as="form" onSubmit={handleSubmit(handleSettings)} noValidate gap={10}>
                <FormControl w={256}>
                    <Text as="label" display="block" w="100%" className="input-file">
                        {logo && <Image src={logo} layout="responsive" width={512} height={512} />}
                        <Text as="strong" display="flex" alignItems="center" justifyContent="center">
                            <MdOutlineUploadFile size={18} /> Upload a logo
                        </Text>
                        <input type="file" {...register('logo')} hidden onChange={handleUpload} />
                    </Text>
                </FormControl>
                <Box width="calc(100% - 256px - 10px)">
                    <FormControl isInvalid={!!errors.title} isRequired mb={5} _last={{ mb: 0 }}>
                        <FormLabel htmlFor="title_blog">Title of blog</FormLabel>
                        <Input
                            type="text"
                            placeholder="Title of blog"
                            id="title_blog"
                            autoComplete="off"
                            {...register('title', { required: 'Please provide the title' })}
                        />
                        <FormErrorMessage fontSize="xs">{(errors.title ? errors.title.message : null) as unknown as ReactNode}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.locales} mb="1.5rem">
                        <FormLabel htmlFor="post_locale">Language</FormLabel>
                        <Controller
                            render={({ field: f }: any) => (
                                <Select
                                    options={localeList}
                                    id="locale"
                                    {...f}
                                    isMulti
                                    value={f.value}
                                />
                            )}
                            control={control}
                            onChange={(val: { value: string }) => console.log(val)}
                            {...register('locales', { required: 'Please select the language of blog' })}
                        />
                        <FormErrorMessage fontSize="xs">{(errors.locales ? errors.locales.message : null) as unknown as ReactNode}</FormErrorMessage>
                    </FormControl>

                    <HStack>
                        <FormControl display="flex" alignItems="center">
                            <Switch id="under_construction" {...register('under_construction')} />
                            <FormLabel htmlFor="under_construction" ml={5} mb={0} lineHeight={1}>Under construction</FormLabel>
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                            <Switch id="under_maintenance" {...register('under_maintenance')} />
                            <FormLabel htmlFor="under_maintenance" ml={5} mb={0} lineHeight={1}>Under maintenance</FormLabel>
                        </FormControl>
                    </HStack>

                    <HStack as="footer" justifyContent="flex-end">
                        <Button
                            id="save_button"
                            colorScheme="blue"
                            mt={10}
                            leftIcon={<MdOutlineSave size={18} />}
                            type="submit"
                            loadingText="Updating..."
                            isLoading={loading}
                        >
                            Save
                        </Button>
                    </HStack>
                </Box>
            </HStack>
        </Box>
    );
};

export default SettingsForm;
