import { Box, Flex, Button } from '@chakra-ui/react';
import { useCategories } from '@/apis/category';
import Form from './form';
import ListingTable from '@/components/table';
import Item from './item';
import { type ModelCategory } from '@/models/category';
import { MdOutlineControlPoint } from 'react-icons/md';

const columns = [
    { label: 'Name', w: '30%' },
    { label: 'Description', w: '35%' },
    { label: 'Status', w: '7%' },
    { label: 'Created at', w: '13%' },
    { label: 'Actions', w: '15%', textAlign: 'right' },
];

export default function CategoriesView() {
    const { data, error } = useCategories();

    return (
        <Box p="2rem">
            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong>{data?.list.count || 0} results found</strong>
                <Form title="Add a new category">
                    {({ onOpen }) => (
                        <Button colorScheme="blue" size="sm" leftIcon={<MdOutlineControlPoint size={18} />} onClick={onOpen}>
                            Add a new category
                        </Button>
                    )}
                </Form>
            </Flex>

            <ListingTable items={data?.list.items} loading={!!data} error={error} columns={columns}>
                {({ items }) => items.map((item: ModelCategory) => <Item key={item._id} data={item} />)}
            </ListingTable>
        </Box>
    );
}
