import { ReactNode } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const Path = ({ register, errors }) => {
    return (
        <FormControl isInvalid={!!errors.path} isRequired>
            <FormLabel htmlFor="post_path">Path</FormLabel>
            <Input id="post_path" name="path" autoComplete="off" {...register} />
            <FormErrorMessage fontSize="xs">{(errors.path ? errors.path.message : null) as unknown as ReactNode}</FormErrorMessage>
        </FormControl>
    );
};

export default Path;
