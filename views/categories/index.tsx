import { Box, Flex, Button } from '@chakra-ui/react';
import { MdOutlineControlPoint } from 'react-icons/md';
import ListingTable from '@/components/table';
import { useCategories } from '@/apis/category';
import { type ModelCategory } from '@/models/category';
import Paginate from '@/components/paginate';
import store, { useStore } from '@/store';
import Form from './form';
import Item from './item';
import Filters from './filters';

const columns = [
    { label: 'Name', w: '30%' },
    { label: 'Description', w: '35%' },
    { label: 'Status', w: '7%' },
    { label: 'Created at', w: '13%' },
    { label: 'Actions', w: '15%', textAlign: 'right' },
];

export default function CategoriesView() {
    const { paginate: { skip, limit }, filters } = useStore((state) => state.category);
    const { data, error } = useCategories({ skip, limit, filters });

    function handlePage(event) {
        const state = store.getState();
        store.setState({
            ...state,
            category: {
                ...state.category,
                paginate: {
                    ...state.category.paginate,
                    skip: (event.selected * state.category.paginate.limit) % (data?.list.count || 1),
                },
            },
        });
    }

    return (
        <Box p="2rem">
            <Filters />

            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong>{data?.list.count || 0} results found</strong>
                <Form title="Add a new category">
                    {({ onOpen }) => (
                        <Button colorScheme="blue" leftIcon={<MdOutlineControlPoint size={18} />} onClick={onOpen}>
                            Add a new category
                        </Button>
                    )}
                </Form>
            </Flex>

            <ListingTable items={data?.list.items} loading={!!data} error={error} columns={columns}>
                {({ items }) => items.map((item: ModelCategory) => <Item key={item._id} data={item} />)}
            </ListingTable>

            <Paginate key={data?.list.count} count={data?.list.count} limit={limit} handlePage={handlePage} />
        </Box>
    );
}
