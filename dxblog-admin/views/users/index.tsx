import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { MdOutlineControlPoint } from 'react-icons/md';
import ListingTable from '@/components/table';
import { useUsers } from '@/apis/user';
import { type ModelUser } from '@/models/user';
import store, { useStore } from '@/store';

const Paginate = dynamic(() => import('@/components/paginate'), { ssr: true });
const Form = dynamic(() => import('./form'), { ssr: true });
const Item = dynamic(() => import('./item'), { ssr: true });
const Filters = dynamic(() => import('./filters'), { ssr: true });

const columns = [
    { label: 'Name', w: '30%' },
    { label: 'Description', w: '35%' },
    { label: 'Status', w: '7%' },
    { label: 'Created at', w: '13%' },
    { label: 'Actions', w: '15%', textAlign: 'right' },
];

export default function UsersView() {
    const { paginate: { skip, limit }, filters } = useStore((state) => state.user);
    const { data, error } = useUsers({ skip, limit, filters });

    function handlePage(event) {
        const state = store.getState();
        store.setState({
            ...state,
            user: {
                ...state.user,
                paginate: {
                    ...state.user.paginate,
                    skip: (event.selected * state.user.paginate.limit) % (data?.list.count || 1),
                },
            },
        });
    }

    return (
        <Box p="2rem">
            <Suspense><Filters /></Suspense>

            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong id="results">{data?.list.count || 0} results found</strong>

                <Suspense>
                    <Form title="Add a new user">
                        {({ onOpen }) => (
                            <Button id="add_user_button" colorScheme="blue" leftIcon={<MdOutlineControlPoint size={18} />} onClick={onOpen}>
                                Add a new user
                            </Button>
                        )}
                    </Form>
                </Suspense>
            </Flex>

            <Suspense>
                <ListingTable id="user_list" items={data?.list.items} loading={!!data} error={error} columns={columns}>
                    {({ items }) => items.map((item: ModelUser) => <Item key={item._id} data={item} />)}
                </ListingTable>
            </Suspense>

            <Suspense>
                <Paginate key={data?.list.count} count={data?.list.count} limit={limit} handlePage={handlePage} />
            </Suspense>
        </Box>
    );
}
