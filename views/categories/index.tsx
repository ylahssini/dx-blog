import { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { MdOutlineControlPoint } from 'react-icons/md';
import ListingTable from '@/components/table';
import { useCategories } from '@/apis/category';
import { type ModelCategory } from '@/models/category';
import Form from './form';
import Item from './item';
import Paginate from '@/components/paginate';

const columns = [
    { label: 'Name', w: '30%' },
    { label: 'Description', w: '35%' },
    { label: 'Status', w: '7%' },
    { label: 'Created at', w: '13%' },
    { label: 'Actions', w: '15%', textAlign: 'right' },
];

// TODO I must find the way to mutate categories globally
export default function CategoriesView() {
    const [skip, setSkip] = useState(0);
    const { data, error, mutate } = useCategories({ skip });

    function handlePage(event) {
        setSkip((event.selected * 3) % (data?.list.count || 1));
    }

    return (
        <Box p="2rem">
            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong>{data?.list.count || 0} results found</strong>
                <Form title="Add a new category" mutate={mutate}>
                    {({ onOpen }) => (
                        <Button colorScheme="blue" size="sm" leftIcon={<MdOutlineControlPoint size={18} />} onClick={onOpen}>
                            Add a new category
                        </Button>
                    )}
                </Form>
            </Flex>

            <ListingTable items={data?.list.items} loading={!!data} error={error} columns={columns}>
                {({ items }) => items.map((item: ModelCategory) => <Item key={item._id} data={item} mutate={mutate} />)}
            </ListingTable>

            <Paginate count={data?.list.count} limit={3} handlePage={handlePage} />
        </Box>
    );
}
