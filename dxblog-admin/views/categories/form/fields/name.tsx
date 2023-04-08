import { ReactNode, useRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';

const Name = ({ register, errors }) => {
    const nameRef = useRef();
    const { data: settings } = useSettings();

    const locales = settings?.locales || [];

    return (
        <>
            <FormControl isInvalid={!!errors?.original_name} isRequired>
                <FormLabel htmlFor="original_name">Original name</FormLabel>
                <Input ref={nameRef} id="original_name" name="original_name" autoComplete="off" {...register('original_name', { required: 'Please provide the name of category' })} />
                <FormErrorMessage fontSize="xs">{(errors.original_name ? errors.original_name.message : null) as unknown as ReactNode}</FormErrorMessage>
            </FormControl>

            <Card variant="outline">
                <CardHeader borderBottomWidth={1} borderColor="gray.100">
                    <Heading size="sm">Name</Heading>
                </CardHeader>
                <CardBody>
                {
                    locales.map((locale) => {
                        const language = Locales[locale];
                        const field = `name_${locale}`;

                        return (
                            <FormControl key={locale} isInvalid={!!errors?.[field]} isRequired mb={5} _last={{ mb: 0 }}>
                                <FormLabel htmlFor={field}>{language}</FormLabel>
                                <Input
                                    name={field}
                                    autoComplete="off"
                                    {...register(field, { required: `Please provide the ${language.toLowerCase()} version of name` })}
                                />
                                <FormErrorMessage fontSize="xs">{(errors[field] ? errors[field].message : null) as unknown as ReactNode}</FormErrorMessage>
                            </FormControl>
                        );
                    })
                }
                </CardBody>
            </Card>
        </>
    );
};

export default Name;
