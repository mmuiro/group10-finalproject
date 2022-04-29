import { useEffect, useState } from "react";
import checkAuth from "../utils/checkAuth.js";
import { useNavigate } from "react-router";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Box,
    Flex,
    Text,
    Divider,
} from "@chakra-ui/react";
import authFetch from "../utils/authFetch.js";

const AddScoreCardPage = () => {
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [allCourses, setAllCourses] = useState([]);
    const [date, setDate] = useState("");
    const [scorePerHole, setScorePerHole] = useState("");

    useEffect(() => {
        checkAuth().then((res) => {
            if (!res) navigate("/login");
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <Flex w="100vw" justifyContent="center" p={12} grow>
            <Box
                w="fit-content"
                boxShadow="xl"
                rounded="md"
                p={6}
                bgColor="white"
                border="2px"
                borderColor="gray.100"
            >
                <FormControl display="flex" w="fit-content">
                    <VStack w={60} spacing={1}>
                        <Text fontWeight="medium" fontSize="xl">
                            Add a score card
                        </Text>
                        <FormLabel alignSelf="start">Course Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Course name"
                            onChange={(e) => setCourseName(e.target.value)}
                        ></Input>
                        <FormLabel alignSelf="start">Date</FormLabel>
                        <input type="date" />
                        <Divider />
                        <Button colorScheme="green" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </VStack>
                </FormControl>
            </Box>
        </Flex>
    );
};

export default AddScoreCardPage;
