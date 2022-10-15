import { Table, TableContainer, Tbody, Tfoot, Thead } from '@chakra-ui/react';
import { If, Then, Else } from 'react-if';
import Columns from './columns';
import Empty from './empty';
import Error from './error';
import Loading from './loading';

export default function ListingTable({ children, loading, items = [], columns, error }) {
    const colSpan = items?.length;

    return (
        <TableContainer>
            <Table size="md">
                <Thead><Columns data={columns} /></Thead>
                <If condition={!loading}>
                    <Then><Loading colSpan={colSpan} /></Then>
                    <Else>
                        <If condition={error}>
                            <Then><Error colSpan={colSpan} /></Then>
                            <Else>
                                <If condition={(items || []).length !== 0}>
                                    <Then><Tbody>{children({ items })}</Tbody></Then>
                                    <Else><Empty colSpan={colSpan} /></Else>
                                </If>
                            </Else>
                        </If>
                    </Else>
                </If>
                <Tfoot><Columns data={columns} /></Tfoot>
            </Table>
        </TableContainer>
    );
}
