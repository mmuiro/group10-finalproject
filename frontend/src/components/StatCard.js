import {
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLine,
    VictoryTheme,
} from "victory";
import { Text, Flex } from "@chakra-ui/react";
import colorToString from "../utils/colorToString";
const BASE_COLOR = { r: 38, g: 169, b: 108 };
const END_COLOR = { r: 2, g: 62, b: 138 };

const getColor = (step, totalSteps) => {
    const ret = {};
    for (let prop of Object.getOwnPropertyNames(BASE_COLOR)) {
        ret[prop] =
            Math.round(
                (END_COLOR[prop] - BASE_COLOR[prop]) * (step / totalSteps)
            ) + BASE_COLOR[prop];
    }
    return ret;
};

const StatCard = ({ dataSets, parData, courseName }) => {
    const totalSteps = dataSets.length - 1;
    dataSets.sort((a, b) => new Date(a.date) - new Date(b.date));
    return (
        dataSets.length > 0 && (
            <Flex
                w="md"
                h="fit-content"
                m={12}
                direction="column"
                alignItems="center"
                justifyContent="start"
            >
                <Text fontWeight="medium" fontSize="lg">
                    {courseName}
                </Text>
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine
                        style={{
                            data: { stroke: "#26a96c" },
                            parent: { border: "1px solid #ccc" },
                        }}
                        data={parData}
                    ></VictoryLine>
                    {dataSets.map((stuff, i) => (
                        <VictoryLine
                            key={i}
                            style={{
                                data: {
                                    stroke: colorToString(
                                        getColor(i, totalSteps)
                                    ),
                                },
                                parent: { border: "1px solid #ccc" },
                            }}
                            data={stuff.points}
                        ></VictoryLine>
                    ))}
                    <VictoryAxis
                        orientation="bottom"
                        label="Hole Number"
                        axisLabelComponent={<VictoryLabel dy={30} />}
                    />
                    <VictoryAxis
                        dependentAxis
                        orientation="left"
                        label="Score"
                        axisLabelComponent={<VictoryLabel dy={-30} />}
                    />
                </VictoryChart>
            </Flex>
        )
    );
};

export default StatCard;
