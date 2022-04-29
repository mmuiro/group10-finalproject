import ScoreCardCarousel from "../components/ScoreCardCarousel";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";

const LandingPage = () => {
    const [loading, setLoading] = useState(true);
    const [displayCards, setDisplayCards] = useState([]);
    const getData = async () => {
        const res = await authFetch("http://localhost:3001/api/landing");
        const json = res.data;
        if (json.success) {
            setDisplayCards(json.bestScoreCards);
        }
    };
    useEffect(() => {
        if (loading) {
            getData();
            setLoading(false);
        }
    }, [loading]);
    return (
        !loading && (
            <Flex justifyContent={"center"} p={16}>
                <ScoreCardCarousel scoreCards={displayCards} />
            </Flex>
        )
    );
};

export default LandingPage;
