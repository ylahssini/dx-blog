import { useEffect, useRef, useState } from 'react';
import { Box, Input, Select, Text } from '@chakra-ui/react';
import debounce from 'lodash.debounce';

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
    reset: boolean;
}

export default function Filter({ custom, item, handleChange, reset = false }: Props) {
    const [value, setValue] = useState('');
    const debounced = useRef<(arg: string) => void>();

    function handleLocalChange(e) {
        e.persist();

        if (!debounced.current) {
            debounced.current = debounce((v) => {
                handleChange(item.key)(v);
            }, 500);
        }

        setValue(e.target.value);

        if (debounced?.current) {
            debounced.current?.(e.target.value);
        }
    }

    useEffect(() => {
        if (reset) {
            setValue('');
        }
    }, [reset]);

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
            <Input placeholder="Type" onChange={handleLocalChange} value={value} />
        </Box>
    );
}
