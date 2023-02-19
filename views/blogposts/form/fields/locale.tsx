import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import Select from 'react-select';
import { ReactNode, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';
import { selectProps } from '..';

const Locale = ({ register, errors, control, }) => {
    const { data: settings } = useSettings();

    const locales = useMemo(() => {
        return (settings?.locales || []).map((locale) => ({ value: locale, label: Locales[locale] }));
    }, [settings?.locales]);

    if (locales.length === 0) {
        return null;
    }

    return (
        <FormControl isInvalid={!!errors.locale} isRequired>
            <FormLabel htmlFor="post_locale">Locale</FormLabel>
            <Controller
                render={({ field: f }: any) => <Select options={locales} id="locale" {...selectProps} {...f} value={locales.find(c => c.value === f.value)} />}
                control={control}
                onChange={(val: { value: string }) => console.log(val)}
                {...register}
            />
            <FormErrorMessage fontSize="xs">{(errors.locale ? errors.locale.message : null) as unknown as ReactNode}</FormErrorMessage>
        </FormControl>
    );
};

export default Locale;
