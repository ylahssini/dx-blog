import { Grid, GridItem, Box } from '@chakra-ui/react';
import { abstractGrid, areas } from './constants';

export default function Abstract() {
    return (
        <Grid
            w="50%"
            height="100%"
            templateRows="0.75fr 1.5fr 0.75fr"
            templateColumns="repeat(3, 1fr)"
            templateAreas={`
                "a b c"
                "d e f"
                "g h i"
            `}
            gridGap=".75rem"
            alignItems="end"
            p="1rem"
        >
            {abstractGrid.map((cells, rowIndex) => (
                cells.map((cell, columnIndex) => {
                    const key = areas[rowIndex][columnIndex];

                    return (
                        <GridItem
                            key={key}
                            gridArea={key}
                            w="100%"
                            h={cell?.height || '100%'}
                        >
                            <Box
                                animation={cell ? `animationOf${key.toUpperCase()} 50s infinite ${columnIndex + 1 * columnIndex}s ease-in-out` : null}
                                bgColor={cell?.color}
                                borderRadius={cell?.borderRadius}
                                w="100%"
                                h="100%"
                            />
                        </GridItem>
                    );
                })
            ))}
        </Grid>
    );
}
