import { ReactNode } from 'react';
import { Card, CardBody, CardHeader, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';

const metas = ['Title', 'Description', 'Keywords'];

const Metas = ({ register, errors }) => {
    const { data: settings } = useSettings();

    const locales = settings?.locales || [];

    return (
        <Card variant="outline">
            <CardHeader borderBottomWidth={1} borderColor="gray.100">
                <Heading size="sm">Metas</Heading>
            </CardHeader>
            <CardBody>
            {
                locales.map((locale, index) => {
                    const language = Locales[locale];

                    return (
                        <>
                            <Card size="sm" variant="unstyled" border={0} my={7} _first={{ mt: 0 }} _last={{ mb: 0 }}>
                                <CardHeader pb={5}><Heading size="sm">{language}</Heading></CardHeader>
                                <CardBody>
                                {
                                    metas.map((meta) => {
                                        const field = `meta_${meta.toLowerCase()}_${locale}`;
                                        const isKeywords = meta === 'Keywords';
                
                                        return (
                                            <FormControl key={field} isInvalid={!!errors?.[field]} isRequired={!isKeywords} mb={5} _last={{ mb: 0 }}>
                                                <FormLabel htmlFor={field}>{meta}</FormLabel>
                                                <Input id={field} name={field} autoComplete="off" {...register(field, { required: isKeywords ? false : `Please provide the ${language.toLowerCase()} version of meta ${meta.toLowerCase()}` })} />
                                                <FormErrorMessage fontSize="xs">{(errors[field] ? errors[field].message : null) as unknown as ReactNode}</FormErrorMessage>
                                            </FormControl>
                                        );
                                    })
                                }
                                </CardBody>
                            </Card>
                            { index !== locales.length - 1 && <Divider />}
                        </>
                    );
                })
            }
            </CardBody>
        </Card>
    );
};

export default Metas;
