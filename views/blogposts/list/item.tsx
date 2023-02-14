import Link from 'next/link';
import { Tr, Td, Button, Tooltip, Icon } from '@chakra-ui/react';
import dayjs from 'dayjs';
import type { ModelBlogPost } from '@/models/blogpost';
import { MdOutlineEdit } from 'react-icons/md';
import Locales from '@/assets/data/locales-codes.json';

export default function Item({ data }: { data: ModelBlogPost }) {
    return (
        <Tr className="post_item">
            <Td w="35%">{data.title}</Td>
            <Td w="10%">{Locales[data.locale]}</Td>
            <Td w="15%">{data.category?.name || '-'}</Td>
            <Td w="12%">{data.status}</Td>
            <Td w="13%">{dayjs(data.created_at).format('DD/MM/YYYY')}</Td>
            <Td w="15%" textAlign="right">
                <Tooltip label="Edit post" placement="top" hasArrow p="5px 10px" borderRadius={4}>
                    <Link href={`/_/posts/edit/${data._id}`} passHref>
                        <a className="__noline">
                            <Button role="group">
                                <Icon as={MdOutlineEdit} _groupHover={{ color: 'blue.300' }} />
                            </Button>
                        </a>
                    </Link>
                </Tooltip>
            </Td>
        </Tr>
    );
}
