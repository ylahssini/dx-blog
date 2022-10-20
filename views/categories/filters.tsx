import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import Filter, { type FilterItem } from '@/components/filter';
import store, { useStore } from '@/store';
import { useCategories } from '@/apis/category';
import { useMemo } from 'react';

export default function Filters() {
    const { paginate: { skip, limit }, filters } = useStore((state) => state.category);
    const { data } = useCategories({ skip, limit, filters });

    function handleChange(key) {
        return (value) => {
            const state = store.getState();
            store.setState({
                ...state,
                category: {
                    ...state.category,
                    paginate: {
                        ...state.category.paginate,
                        skip: 0,
                    },
                    filters: state.category.filters.map((filter) => {
                        if (filter.key === key) {
                            return { ...filter, value };
                        }

                        return filter;
                    }),
                },
            });
        };
    }

    function handleReset() {
        const state = store.getState();
        store.setState({
            ...state,
            category: {
                ...state.category,
                filters: state.category.filters.map((filter) => ({ ...filter, value: '' })),
            },
        });
    }

    const isSomeFilterIsFilled = useMemo(() => filters.some((filter) => filter.value !== ''), [filters]);

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
                        custom={{ className: 'filter_item', w: `calc(${100 / filters.length}% - 1rem)` }}
                    />
                ))}
            </Flex>

            <Divider />
        </Box>
    );
}