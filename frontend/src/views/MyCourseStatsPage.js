import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";
import { useParams } from "react-router-dom";
import StatCard from "../components/StatCard";
import { Flex } from "@chakra-ui/react";

const MyCourseStatsPage = (props) => {
    const [courseName, setCourseName] = useState("");
    const [loading, setLoading] = useState(true);
    const [parData, setParData] = useState([]);
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const res = await authFetch(
                `http://localhost:3001/api/user/viewCourse/${id}`,
                "get"
            );
            const json = res.data;
            if (json.success) {
                setData(
                    json.scoreCards.map((card) => ({
                        date: card.date,
                        points: card.scorePerHole.map((score, i) => ({
                            x: i,
                            y: score,
                        })),
                    }))
                );
                setCourseName(json.courseName);
                setParData(
                    json.parScorePerHole.map((score, i) => ({ x: i, y: score }))
                );
            }
        };
        if (loading) {
            getData();
            setLoading(false);
        }
    }, [loading, id]);
    return (
        !loading && (
            <Flex direction="column" alignItems="center" grow={1}>
                <StatCard
                    dataSets={data}
                    parData={parData}
                    courseName={courseName}
                />
            </Flex>
        )
    );
};

export default MyCourseStatsPage;
