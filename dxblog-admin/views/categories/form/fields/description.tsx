import { ReactNode } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';

const Description = ({ register, errors }) => {
    const { data: settings } = useSettings();

    const locales = settings?.locales || [];

    return (
        <Card variant="outline">
            <CardHeader borderBottomWidth={1} borderColor="gray.100">
                <Heading size="sm">Description</Heading>
            </CardHeader>
            <CardBody>
            {
                locales.map((locale) => {
                    const language = Locales[locale];
                    const field = `description_${locale}`;

                    return (
                        <FormControl key={locale} isInvalid={!!errors?.[field]} isRequired mb={5} _last={{ mb: 0 }}>
                            <FormLabel htmlFor={field}>{language}</FormLabel>
                            <Input
                                name={field}
                                autoComplete="off"
                                {...register(field, { required: `Please provide the ${language.toLowerCase()} version of description` })}
                            />
                            <FormErrorMessage fontSize="xs">{(errors[field] ? errors[field].message : null) as unknown as ReactNode}</FormErrorMessage>
                        </FormControl>
                    );
                })
            }
            </CardBody>
        </Card>
    );
};

export default Description;
