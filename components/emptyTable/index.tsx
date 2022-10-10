import { Tbody, Tr, Td, Center, Heading } from '@chakra-ui/react';
import { MdOutlineGridOff } from 'react-icons/md';

export default function EmptyTable({ colSpan }: { colSpan: number }) {
    return (
        <Tbody className="empty_table">
            <Tr>
                <Td colSpan={colSpan}>
                    <Center flexDir="column" p="2rem">
                        <MdOutlineGridOff size={60} color="var(--danger)" />
                        <Heading as="h6" size="md" pt="1rem">No Data found</Heading>
                    </Center>
                </Td>
            </Tr>
        </Tbody>
    );
}

EmptyTable.defaultProps = {
    colSpan: 1,
};
