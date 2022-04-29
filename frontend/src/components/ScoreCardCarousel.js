import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import ScoreCard from "./ScoreCard.js";

const mod = (inp, m) => {
    while (inp < 0) inp += m;
    return inp % m;
};

const ScoreCardCarousel = ({ scoreCards, width = 3 }) => {
    const [sIndex, setSIndex] = useState(0);
    const rWidth = Math.min(width, scoreCards.length);
    return (
        scoreCards.length > 0 && (
            <Flex alignItems="center" justifyContent="space-around">
                <Button
                    variant="solid"
                    onClick={() =>
                        setSIndex(mod(sIndex - 1, scoreCards.length))
                    }
                    colorScheme="green"
                    mx={4}
                >
                    {"<"}
                </Button>
                <SimpleGrid columns={rWidth} columnGap={4} w="full">
                    {(() => {
                        const lst = [];
                        for (let i = 0; i < rWidth; i++) {
                            lst.push(
                                <ScoreCard
                                    {...scoreCards[
                                        (sIndex + i) % scoreCards.length
                                    ]}
                                    key={i}
                                ></ScoreCard>
                            );
                        }
                        return lst;
                    })()}
                </SimpleGrid>
                <Button
                    variant="solid"
                    onClick={() =>
                        setSIndex(mod(sIndex + 1, scoreCards.length))
                    }
                    colorScheme="green"
                    size="md"
                    mx={4}
                >
                    {">"}
                </Button>
            </Flex>
        )
    );
};

export default ScoreCardCarousel;
