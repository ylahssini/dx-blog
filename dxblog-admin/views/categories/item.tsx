import { Tr, Td, Text, Box, Button, Tooltip, Icon } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ModelCategory } from '@/models/category';
import { MdOutlineCheckCircleOutline, MdHighlightOff, MdOutlineEdit } from 'react-icons/md';
import Form from './form';

export default function Item({ data }: { data: ModelCategory }) {
    return (
        <Tr className="category_item">
            <Td w="40%">{data.original_name}</Td>
            <Td w="20%">
                <Box display="inline-block" mr="5px" verticalAlign="middle">{data.status ? <MdOutlineCheckCircleOutline color="var(--success)" /> : <MdHighlightOff color="var(--danger)" />}</Box>
                {data.status ? <Text color="var(--success)" as="span">Enabled</Text> : <Text color="var(--danger)" as="span">Disabled</Text>}
            </Td>
            <Td w="15%">{dayjs(data.created_at).format('DD/MM/YYYY')}</Td>
            <Td w="25%" textAlign="right">
                <Form title={`Edit category: ${data.original_name}`} mode="edit" item={data}>
                    {({ onOpen }) => (
                        <Tooltip label="Edit category" placement="top" hasArrow p="5px 10px" borderRadius={4}>
                            <Button role="group" onClick={onOpen}>
                                <Icon as={MdOutlineEdit} _groupHover={{ color: 'blue.300' }} />
                            </Button>
                        </Tooltip>
                    )}
                </Form>
            </Td>
        </Tr>
    );
}
