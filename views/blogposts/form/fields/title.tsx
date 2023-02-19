import { ReactNode, useRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const Title = ({ register, errors }) => {
    const titleRef = useRef();

    return (
        <FormControl isInvalid={!!errors.title} isRequired>
            <FormLabel htmlFor="post_title">Title</FormLabel>
            <Input ref={titleRef} id="post_title" name="title" autoComplete="off" {...register} />
            <FormErrorMessage fontSize="xs">{(errors.title ? errors.title.message : null) as unknown as ReactNode}</FormErrorMessage>
        </FormControl>
    );
};

export default Title;
