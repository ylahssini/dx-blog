import { Table, TableContainer, Tbody, Tfoot, Thead } from '@chakra-ui/react';
import { If, Then, Else } from 'react-if';
import Columns from './columns';
import Empty from './empty';
import Error from './error';
import Loading from './loading';

export default function ListingTable({ id, children, loading, items = [], columns, error }) {
    const colSpan = columns.length;

    return (
        <TableContainer id={`${id}_container`}>
            <Table size="md">
                <Thead><Columns data={columns} /></Thead>
                <If condition={error}>
                    <Then><Error colSpan={colSpan} /></Then>
                    <Else>
                        <If condition={!loading}>
                            <Then><Loading colSpan={colSpan} /></Then>
                            <Else>
                                <If condition={(items || []).length !== 0}>
                                    <Then><Tbody id={id}>{children({ items })}</Tbody></Then>
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
