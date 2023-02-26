import { ReactNode } from 'react';
import { Card, CardBody, CardHeader, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';

const Path = ({ register, errors }) => {
    const { data: settings } = useSettings();

    const locales = settings?.locales || [];

    return (
        <Card variant="outline">
            <CardHeader borderBottomWidth={1} borderColor="gray.100">
                <Heading size="sm">Path</Heading>
            </CardHeader>
            <CardBody>
            {
                locales.map((locale) => {
                    const language = Locales[locale];
                    const field = `path_${locale}`;

                    return (
                        <FormControl key={locale} isInvalid={!!errors?.[field]} isRequired mb={5} _last={{ mb: 0 }}>
                            <FormLabel htmlFor={field}>{language}</FormLabel>
                            <Input id={field} name={field} autoComplete="off" {...register(field, { required: `Please provide the ${language.toLowerCase()} version of path` })} />
                            <FormErrorMessage fontSize="xs">{(errors[field] ? errors[field].message : null) as unknown as ReactNode}</FormErrorMessage>
                        </FormControl>
                    );
                })
            }
            </CardBody>
        </Card>
    );
};

export default Path;
