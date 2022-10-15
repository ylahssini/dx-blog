import { Box, Flex } from '@chakra-ui/react';
import { useCategories } from '@/apis/category';
import Form from './form';
import ListingTable from '@/components/table';
import Item from './item';

const columns = [
    { label: 'Name', w: '30%' },
    { label: 'Description', w: '35%' },
    { label: 'Status', w: '7%' },
    { label: 'Created at', w: '13%' },
    { label: 'Actions', w: '15%' },
];

export default function CategoriesView() {
    const { data, error } = useCategories();

    return (
        <Box p="2rem">
            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong>{data?.list.count || 0} results found</strong>
                <Form />
            </Flex>

            <ListingTable items={data?.list.items} loading={!!data} error={error} columns={columns}>
                {({ items }) => items.map((item) => <Item key={item.id} data={item} />)}
            </ListingTable>
        </Box>
    );
}
