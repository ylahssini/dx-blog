import { Tbody, Tr, Td, Center, Heading } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';

export default function Error({ colSpan, error }: { colSpan: number; error: string }) {
    return (
        <Tbody className="error_table">
            <Tr>
                <Td colSpan={colSpan}>
                    <Center flexDir="column" p="2rem">
                        <MdOutlineErrorOutline size={60} color="var(--danger)" />
                        <Heading as="h6" size="md" pt="1rem">{error}</Heading>
                    </Center>
                </Td>
            </Tr>
        </Tbody>
    );
}

Error.defaultProps = {
    colSpan: 1,
    error: 'An error is occured, please refresh the page again',
};
