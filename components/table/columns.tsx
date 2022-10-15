import { Tr, Th } from '@chakra-ui/react';

export default function Columns({ data }: { data: { label: string; w: string }[] }) {
    return (
        <Tr>
            {data.map((column) => (
                <Th key={column.label} w={column.w}>{column.label}</Th>
            ))}
        </Tr>
    );
}
