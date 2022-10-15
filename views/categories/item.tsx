import { Tr, Td, Text, Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ModelCategory } from '@/models/category';
import { MdOutlineCheckCircleOutline, MdHighlightOff } from 'react-icons/md';

export default function Item({ data }: { data: ModelCategory }) {
    return (
        <Tr>
            <Td w="30%">{data.name}</Td>
            <Td w="35%">{data.description}</Td>
            <Td w="7%">
                <Box display="inline-block" mr="5px" verticalAlign="middle">{data.status ? <MdOutlineCheckCircleOutline color="var(--success)" /> : <MdHighlightOff color="var(--danger)" />}</Box>
                {data.status ? <Text color="var(--success)" as="span">Enabled</Text> : <Text color="var(--danger)" as="span">Disabled</Text>}
            </Td>
            <Td w="13%">{dayjs(data.created_at).format('DD/MM/YYYY')}</Td>
            <Td w="15%">
                {/* // todo: Add edit button */}
            </Td>
        </Tr>
    );
}
