import { Tbody, Tr, Td, Center, Heading, Spinner } from '@chakra-ui/react';

export default function Loading({ colSpan }: { colSpan: number }) {
    return (
        <Tbody className="loading_table">
            <Tr>
                <Td colSpan={colSpan}>
                    <Center flexDir="column" p="2rem">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.50"
                            color="blue.700"
                            size="xl"
                        />
                        <Heading as="h6" size="md" pt="1rem">Loading the list...</Heading>
                    </Center>
                </Td>
            </Tr>
        </Tbody>
    );
}

Loading.defaultProps = {
    colSpan: 1,
};
