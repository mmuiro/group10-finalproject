import ScoreCardCarousel from "../components/ScoreCardCarousel";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";
import checkAuth from "../utils/checkAuth";
import { useNavigate } from "react-router";

const UserHomePage = () => {
    const [loading, setLoading] = useState(true);
    const [displayCards, setDisplayCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then((res) => {
            console.log(res);
            if (!res) navigate("/login");
        });
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await authFetch("http://localhost:3001/api/user/home");
            const json = res.data;
            if (json.success) {
                let scoreCards = json.scoreCards;
                scoreCards.sort((a, b) => a.totalScore - b.totalScore);
                scoreCards = scoreCards.slice(0, 10);
                setDisplayCards(scoreCards);
            }
        };
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

export default UserHomePage;
