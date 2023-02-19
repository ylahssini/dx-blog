import Editor from '@/components/entry/editor';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const Content = ({ register, control }) => {
    return (
        <FormControl>
            <FormLabel htmlFor="post_content">Content</FormLabel>
            <Controller
                render={({ field: f }: any) => <Editor name="post_content" id="post_content" {...f} />}
                control={control}
                {...register}
            />
        </FormControl>
    );
};

export default Content;
