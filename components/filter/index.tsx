import { Box, Input, Select, Text } from '@chakra-ui/react';

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
    if (item.type === 'select') {
        return (
            <Box {...custom}>
                <Text as="label" fontSize="xs">{item.label}</Text>
                <Select placeholder="Select" onChange={handleChange(item.key)} value={item.value}>
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
            <Input placeholder="Type" onChange={handleChange(item.key)} value={item.value} />
        </Box>
    );
}
