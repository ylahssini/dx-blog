import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Input, Select, Text } from '@chakra-ui/react';
import { useDebounce } from '@/utils/hooks';

export interface FilterItem {
    key: string;
    label: string;
    type: 'text' | 'select',
    options?: { value: string; label: string }[];
    value: string | undefined;
}

interface Props {
    custom?: Record<string, unknown>;
    item: FilterItem;
    handleChange: (id: string) => (e: unknown) => void;
}

export default function Filter({ custom, item, handleChange }: Props) {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        if (debouncedValue !== '') {
            handleChange(item.key)(debouncedValue);
        }
    }, [debouncedValue]);

    const handleLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    if (item.type === 'select') {
        return (
            <Box {...custom}>
                <Text as="label" fontSize="xs">{item.label}</Text>
                <Select placeholder="Select" onChange={(e) => handleChange(item.key)(e.target.value)} value={item.value}>
                    {item.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </Select>
            </Box>
        );
    }

    return (
        <Box {...custom}>
            <Text as="label" fontSize="xs">{item.label}</Text>
            <Input placeholder="Type" onChange={handleLocalChange} value={item.value} />
        </Box>
    );
}
