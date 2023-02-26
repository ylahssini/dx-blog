import { Card, CardBody, CardHeader, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import Editor from '@/components/entry/editor';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';

const Content = ({ register, control }) => {
    const { data: settings } = useSettings();

    const locales = settings?.locales || [];

    return (
        <Card shadow="none" borderWidth={1} borderColor="gray.100">
            <CardHeader borderBottomWidth={1} borderColor="gray.100">
                <Heading size="sm">Content</Heading>
            </CardHeader>
            <CardBody>
            {
                locales.map((locale) => {
                    const language = Locales[locale];
                    const field = `content_${locale}`;

                    return (
                        <FormControl key={locale} mb={5} _last={{ mb: 0 }}>
                            <FormLabel htmlFor={field}>{language}</FormLabel>
                            <Controller
                                render={({ field: f }: any) => <Editor name={field} id={field} {...f} />}
                                control={control}
                                {...register(field)}
                            />
                        </FormControl>
                    );
                })
            }
            </CardBody>
        </Card>
    );
};

export default Content;
