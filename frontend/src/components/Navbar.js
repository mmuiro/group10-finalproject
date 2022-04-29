import { Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import checkAuth from "../utils/authFetch";

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    useEffect(() => {
        checkAuth().then((res) => {
            setLoggedIn(res);
        });
    }, [location]);
    return (
        <nav className="navbar">
            <Flex
                justifyContent="space-between"
                px={20}
                py={4}
                bgColor="green.400"
                boxShadow="lg"
                alignItems="center"
            >
                <Box p={2} rounded="md" bgColor="white">
                    <Text
                        fontWeight="bold"
                        bgGradient="linear(to-l, #26a96c, #023e8a)"
                        bgClip="text"
                    >
                        Under Par
                    </Text>
                </Box>
                <Flex
                    className="links"
                    gap={4}
                    fontWeight="medium"
                    color="white"
                >
                    {loggedIn ? (
                        <>
                            <Link to="/home">Home</Link>
                            <Link to="/addScoreCard">Add Card</Link>
                            <Link to="/addCourse">Add Course</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">Landing</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                </Flex>
            </Flex>
        </nav>
    );
};

export default Navbar;
