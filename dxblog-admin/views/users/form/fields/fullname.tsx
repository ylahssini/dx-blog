import { ReactNode } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';

const Fullname = ({ register, errors }) => (
    <Card variant="outline" size="sm">
        <CardHeader borderBottomWidth={1} borderColor="gray.100">
            <Heading size="sm">Full name</Heading>
        </CardHeader>
        <CardBody>
            <FormControl isInvalid={!!errors?.first_name} isRequired mb={15}>
                <FormLabel htmlFor="first_name">First name</FormLabel>
                <Input id="first_name" name="first_name" autoComplete="off" {...register('first_name', { required: 'Please provide the first name' })} />
                <FormErrorMessage fontSize="xs">{(errors.first_name ? errors.first_name.message : null) as unknown as ReactNode}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.last_name} isRequired>
                <FormLabel htmlFor="last_name">Last name</FormLabel>
                <Input id="last_name" name="last_name" autoComplete="off" {...register('last_name', { required: 'Please provide the last name' })} />
                <FormErrorMessage fontSize="xs">{(errors.last_name ? errors.last_name.message : null) as unknown as ReactNode}</FormErrorMessage>
            </FormControl>
        </CardBody>
    </Card>
);

export default Fullname;
