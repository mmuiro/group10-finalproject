import {
    Grid,
    GridItem,
    VStack,
    Text,
    Box,
    SimpleGrid,
    Flex,
} from "@chakra-ui/react";

const ScoreCard = ({ courseName, date, parScorePerHole, scorePerHole }) => {
    const width = parScorePerHole.length + 3;
    return (
        <VStack
            w="max-content"
            m={4}
            rounded="lg"
            overflow="hidden"
            dropShadow="md"
            spacing={0}
            border={"4px"}
            borderColor="blackAlpha.600"
        >
            <Flex
                h="40px"
                bg="yellow.200"
                w="full"
                m={0}
                p={6}
                justifyContent="center"
                alignItems="center"
                direction="column"
                bgColor="green.400"
            >
                <Text fontWeight="medium" fontSize="lg">
                    {courseName}
                </Text>
                <Text fontWeight="medium" fontSize="sm">
                    {new Date(date).toLocaleDateString()}
                </Text>
            </Flex>
            <SimpleGrid columns={width} w="full">
                <GridItem colStart={1} colSpan={3} rowStart={1} rowSpan={1}>
                    <Box bgColor="blue.500" w="full" h="full" p={2}>
                        <Text fontWeight="medium" color="White">
                            Hole Number
                        </Text>
                    </Box>
                </GridItem>
                {(() => {
                    let lst = [];
                    for (let i = 0; i < parScorePerHole.length; i++) {
                        lst.push(
                            <GridItem colStart={4 + i} rowStart={1} key={i}>
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    p={2}
                                    borderX="1px"
                                    borderColor="blue.600"
                                    bgColor="blue.500"
                                >
                                    <Text fontWeight="medium" color="white">
                                        {i}
                                    </Text>
                                </Flex>
                            </GridItem>
                        );
                    }
                    return lst;
                })()}
                <GridItem colStart={1} colSpan={3} rowStart={2} rowSpan={1}>
                    <Box bgColor="green.400" w="full" h="full" p={2}>
                        <Text fontWeight="medium" color="White">
                            Par
                        </Text>
                    </Box>
                </GridItem>

                {parScorePerHole.map((v, i) => (
                    <GridItem colStart={4 + i} rowStart={2} key={width + i}>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                            border="1px"
                            borderColor="gray.300"
                        >
                            {v}
                        </Flex>
                    </GridItem>
                ))}
                <GridItem colStart={1} colSpan={3} rowStart={3} rowSpan={1}>
                    <Box bgColor="blue.500" w="full" h="full" p={2}>
                        <Text fontWeight="medium" color="White">
                            Score
                        </Text>
                    </Box>
                </GridItem>
                {scorePerHole.map((v, i) => (
                    <GridItem colStart={4 + i} rowStart={3} key={width + i}>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                            border="1px"
                            borderColor="gray.300"
                        >
                            {v}
                        </Flex>
                    </GridItem>
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default ScoreCard;
