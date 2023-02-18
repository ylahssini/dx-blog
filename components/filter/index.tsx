import { useEffect, useRef, useState } from 'react';
import { Box, Input, Select, Text } from '@chakra-ui/react';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import { type FilterItem } from '@/store';

interface Props {
    custom?: Record<string, unknown>;
    item: FilterItem;
    handleChange: (id: string) => (e: unknown) => void;
    loadExternalOptions?: (value: string) => void;
    reset: boolean;
}

export default function Filter({ custom, item, handleChange, loadExternalOptions, reset = false }: Props) {
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

    function handleSelect(el) {
        setValue(el);
        handleChange(item.key)(el.value);
    }

    async function loadOptions(value: string): Promise<any> {
        if (loadExternalOptions) {
            const result = await loadExternalOptions(value);
            return result;
        }

        return [];
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

    if (item.type === 'text') {
        return (
            <Box {...custom}>
                <Text as="label" fontSize="xs">{item.label}</Text>
                <Input placeholder="Type" onChange={handleLocalChange} value={value} />
            </Box>
        );
    }

    if (item.type === 'asyncSelect') {
        return (
            <Box {...custom}>
                <Text as="label" fontSize="xs">{item.label}</Text>
                <AsyncSelect
                    id={item.key}
                    cacheOptions
                    loadOptions={loadOptions}
                    onChange={handleSelect}
                    value={value}
                />
            </Box>
        );
    }

    return null;
}
