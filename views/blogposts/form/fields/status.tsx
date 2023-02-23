import { ReactNode } from 'react';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { selectProps } from '..';

const POST_STATUS_OPTIONS = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Disabled', value: 'DISABLED' },
    { label: 'Published', value: 'PUBLISHED' },
];

const Status = ({ errors, control, register }) => {
    return (
        <FormControl isInvalid={!!errors?.status} isRequired>
            <FormLabel htmlFor="post_status">Status</FormLabel>
            <Controller
                render={({ field: f }: any) => (
                    <Select
                        options={POST_STATUS_OPTIONS}
                        id="status"
                        {...selectProps}
                        {...f}
                        value={POST_STATUS_OPTIONS.find(c => c.value === f.value)}
                        onChange={(val: { value: string }) => f.onChange(val.value)}
                    />
                )}
                control={control}
                {...register}
            />
            <FormErrorMessage fontSize="xs">{(errors.status ? errors.status.message : null) as unknown as ReactNode}</FormErrorMessage>
        </FormControl>
    );
};

export default Status;
