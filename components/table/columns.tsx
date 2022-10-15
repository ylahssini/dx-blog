import { Tr, Th } from '@chakra-ui/react';

export default function Columns({ data }: { data: { label: string; }[] }) {
    return (
        <Tr>
            {data.map((column) => (
                <Th key={column.label} {...column}>{column.label}</Th>
            ))}
        </Tr>
    );
}
