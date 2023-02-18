import { useMemo, useState } from 'react';
import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Filter from '@/components/filter';
import store, { type Option, useStore, type FilterItem } from '@/store';
import { useBlogPosts } from '@/apis/blogpost';
import { getCategories } from '@/apis/category';
import { sleep } from '@/utils/functions';
import Locales from '@/assets/data/locales-codes.json';

export default function Filters() {
    const [reset, setReset] = useState(false);
    const { paginate: { skip, limit }, filters, populate } = useStore((state) => state.post);
    const { data } = useBlogPosts({ skip, limit, filters, populate });

    function handleExternalApi(key: string) {
        return async (value: string) => {
            const mapInside = {
                category_id: async () => {
                    try {
                        const result = await getCategories({ filter: JSON.stringify({ name: value }) });
                        return (result.data.list?.items || []).map((item) => ({ value: item.id, label: item.name }));
                    } catch (error) {
                        console.log(error);
                        return [];
                    }
                },
                locale: () => {
                    const filterLocales = () => {
                        return Object.entries(Locales)
                            .filter(([, label]) => label.toLowerCase().includes(value.toLowerCase().trim()))
                            .map(([code, label]) => ({
                                label,
                                value: code,
                            }));
                    };

                    return new Promise<Option[]>(async (resolve) => {
                        await sleep(300);
                        resolve(filterLocales());
                    });
                }
            };

            return await mapInside[key]();
        };
    }

    function handleChange(key) {
        return (value) => {
            const state = store.getState();
            store.setState({
                ...state,
                post: {
                    ...state.post,
                    paginate: {
                        ...state.post.paginate,
                        skip: 0,
                    },
                    filters: state.post.filters.map((filter) => {
                        if (filter.key === key) {
                            return { ...filter, value };
                        }

                        return filter;
                    }),
                },
            });
        };
    }

    async function handleReset() {
        const state = store.getState();
        store.setState({
            ...state,
            post: {
                ...state.post,
                filters: state.post.filters.map((filter) => ({ ...filter, value: '' })),
            },
        });

        setReset(true);
        await sleep(100);
        setReset(false);
    }

    const isSomeFilterIsFilled = useMemo(() => filters.some((filter) => filter.value.length > 0), [filters]);

    return (
        <Box as="section" pb="2rem">
            <Box as="header" display="flex" justifyContent="space-between" alignItems="center">
                <Heading as="h2" fontSize="3xl" color="blue.800" pb="1rem">Filters</Heading>
                {isSomeFilterIsFilled && (
                    <Button
                        id="reset_filters"
                        leftIcon={<MdOutlineFilterAlt size={18} />}
                        variant="outline"
                        onClick={handleReset}
                        isLoading={!data}
                        disabled={!data}
                    >
                        Reset
                    </Button>
                )}
            </Box>

            <Flex id="filters" gap="1rem" wrap="wrap" justifyContent="space-between" alignItems="center" pb="1rem">
                {filters.map((filter: FilterItem) => (
                    <Filter
                        key={filter.key}
                        item={filter}
                        handleChange={handleChange}
                        loadExternalOptions={['category_id', 'locale'].includes(filter.key) ? handleExternalApi(filter.key) : undefined}
                        custom={{ className: 'filter_item', w: `calc(${100 / filters.length}% - 1rem)` }}
                        reset={reset}
                    />
                ))}
            </Flex>

            <Divider />
        </Box>
    );
}
