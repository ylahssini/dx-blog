import EmptyTable from '@/components/emptyTable';
import { Box, Flex, Table, TableContainer, Tfoot, Thead } from '@chakra-ui/react';
import Columns from './columns';
import Form from './form';

export default function CategoriesView() {
    return (
        <Box p="2rem">
            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong>0 results found</strong>
                <Form />
            </Flex>

            <TableContainer>
                <Table size="sm">
                    <Thead><Columns /></Thead>
                    <EmptyTable colSpan={4} />
                    <Tfoot><Columns /></Tfoot>
                </Table>
            </TableContainer>
        </Box>
    );
}
