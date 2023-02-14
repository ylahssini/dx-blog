import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { MdOutlineControlPoint } from 'react-icons/md';
import ListingTable from '@/components/table';
import { useBlogPosts } from '@/apis/blogpost';
import store, { useStore } from '@/store';
import type { ModelBlogPost } from '@/models/blogpost';
import Link from 'next/link';

const Paginate = dynamic(() => import('@/components/paginate'), { ssr: true });
const Item = dynamic(() => import('./item'), { ssr: true });
// const Filters = dynamic(() => import('./filters'), { ssr: true });

const columns = [
    { label: 'Title', w: '35%' },
    { label: 'Locale', w: '10%' },
    { label: 'Category', w: '15%' },
    { label: 'Status', w: '12%' },
    { label: 'Created at', w: '13%' },
    { label: 'Actions', w: '15%', textAlign: 'right' },
];

export default function BlogPostsView() {
    const { paginate: { skip, limit }, populate, filters } = useStore((state) => state.post);
    const { data, error } = useBlogPosts({ skip, limit, filters, populate });

    function handlePage(event) {
        const state = store.getState();
        store.setState({
            ...state,
            post: {
                ...state.post,
                paginate: {
                    ...state.post.paginate,
                    skip: (event.selected * state.post.paginate.limit) % (data?.list.count || 1),
                },
            },
        });
    }

    return (
        <Box p="2rem">
            {/* <Suspense><Filters /></Suspense> */}

            <Flex as="header" pb="2rem" justifyContent="space-between" alignItems="center">
                <strong id="results">{data?.list.count || 0} results found</strong>

                <Suspense>
                    <Link href="/_/posts/add" passHref>
                        <a className="__noline">
                            <Button id="add_post_button" colorScheme="blue" leftIcon={<MdOutlineControlPoint size={18} />}>
                                Add a new post
                            </Button>
                        </a>
                    </Link>
                </Suspense>
            </Flex>

            <Suspense>
                <ListingTable id="post_list" items={data?.list.items} loading={!!data} error={error} columns={columns}>
                    {({ items }) => items.map((item: ModelBlogPost) => <Item key={item._id} data={item} />)}
                </ListingTable>
            </Suspense>

            <Suspense>
                <Paginate key={data?.list.count} count={data?.list.count} limit={limit} handlePage={handlePage} />
            </Suspense>
        </Box>
    );
}
