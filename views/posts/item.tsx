import { Tr, Td, Text, Box, Button, Tooltip, Icon } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ModelPost } from '@/models/post';
import { MdOutlineCheckCircleOutline, MdHighlightOff, MdOutlineEdit } from 'react-icons/md';
import Locales from '@/assets/data/locales-codes.json';
// import Form from './form';

export default function Item({ data }: { data: ModelPost }) {
    return (
        <Tr className="post_item">
            <Td w="50%">{data.title}</Td>
            <Td w="10%">{Locales[data.locale]}</Td>
            <Td w="12%">
                <Box display="inline-block" mr="5px" verticalAlign="middle">{data.status ? <MdOutlineCheckCircleOutline color="var(--success)" /> : <MdHighlightOff color="var(--danger)" />}</Box>
                {data.status ? <Text color="var(--success)" as="span">Enabled</Text> : <Text color="var(--danger)" as="span">Disabled</Text>}
            </Td>
            <Td w="13%">{dayjs(data.created_at).format('DD/MM/YYYY')}</Td>
            <Td w="15%" textAlign="right">
                {/* <Form title={`Edit category: ${data.title}`} mode="edit" item={data}>
                    {({ onOpen }) => (
                        <Tooltip label="Edit category" placement="top" hasArrow p="5px 10px" borderRadius={4}>
                            <Button role="group" onClick={onOpen}>
                                <Icon as={MdOutlineEdit} _groupHover={{ color: 'blue.300' }} />
                            </Button>
                        </Tooltip>
                    )}
                    </Form> */}
            </Td>
        </Tr>
    );
}
