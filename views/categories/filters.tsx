import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import Filter, { type FilterItem } from '@/components/filter';
import store, { useStore } from '@/store';

export default function Filters() {
    const { filters } = useStore((state) => state.category);

    function handleChange(key) {
        return (e) => {
            const state = store.getState();
            store.setState({
                ...state,
                category: {
                    ...state.category,
                    filters: state.category.filters.map((filter) => {
                        if (filter.key === key) {
                            return { ...filter, value: e.target.value };
                        }

                        return filter;
                    }),
                },
            });
        };
    }

    function handleFilter() {
        //
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

    return (
        <Box as="section" pb="2rem">
            <Heading as="h2" fontSize="3xl" color="blue.800" pb="1rem">Filters</Heading>
            <Flex gap="1rem" wrap="wrap" justifyContent="space-between" alignItems="center">
                {filters.map((filter: FilterItem) => (
                    <Filter
                        key={filter.key}
                        item={filter}
                        handleChange={handleChange}
                        custom={{ w: `calc(${100 / filters.length}% - 1rem)` }}
                    />
                ))}
            </Flex>
            <Flex as="footer" justifyContent="end" alignItems="center" py="1rem" gap="1rem">
                <Button size="sm" variant="outline" onClick={handleReset}>Reset</Button>
                <Button size="sm" colorScheme="blue" variant="outline" onClick={handleFilter}>Filter</Button>
            </Flex>

            <Divider />
        </Box>
    );
}
