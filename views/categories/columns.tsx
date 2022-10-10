import { Tr, Th } from '@chakra-ui/react';

export default function Columns() {
    return (
        <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Created at</Th>
            <Th>Actions</Th>
        </Tr>
    );
}
