import { ReactNode, useRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { useSettings } from '@/apis/setting';
import Locales from '@/assets/data/locales-codes.json';

const Title = ({ register, errors }) => {
    const titleRef = useRef();
    const { data: settings } = useSettings();

    const locales = settings?.locales || [];

    return (
        <>
            <FormControl isInvalid={!!errors?.original_title} isRequired>
                <FormLabel htmlFor="post_original_title">Original title</FormLabel>
                <Input ref={titleRef} id="post_original_title" name="original_title" autoComplete="off" {...register('original_title', { required: 'Please provide the title of post' })} />
                <FormErrorMessage fontSize="xs">{(errors.original_title ? errors.original_title.message : null) as unknown as ReactNode}</FormErrorMessage>
            </FormControl>

            <Card shadow="none" borderWidth={1} borderColor="gray.100">
                <CardHeader borderBottomWidth={1} borderColor="gray.100">
                    <Heading size="sm">Title</Heading>
                </CardHeader>
                <CardBody>
                {
                    locales.map((locale) => {
                        const language = Locales[locale];
                        const field = `title_${locale}`;

                        return (
                            <FormControl key={locale} isInvalid={!!errors?.[field]} isRequired mb={5} _last={{ mb: 0 }}>
                                <FormLabel htmlFor={field}>{language}</FormLabel>
                                <Input
                                    name={field}
                                    autoComplete="off"
                                    {...register(field, { required: `Please provide the ${language.toLowerCase()} version of title` })}
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

export default Title;
