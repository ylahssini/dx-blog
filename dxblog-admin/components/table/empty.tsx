import { Tbody, Tr, Td, Center, Heading } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';

export default function Empty({ colSpan }: { colSpan: number }) {
    return (
        <Tbody className="empty_table">
            <Tr>
                <Td colSpan={colSpan}>
                    <Center flexDir="column" p="2rem">
                        <MdOutlineErrorOutline size={60} color="var(--danger)" />
                        <Heading as="h6" size="md" pt="1rem">No Data found</Heading>
                    </Center>
                </Td>
            </Tr>
        </Tbody>
    );
}

Empty.defaultProps = {
    colSpan: 1,
};
