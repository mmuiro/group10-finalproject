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

const SignupPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [serverMsg, setServerMsg] = useState("");

    useEffect(() => {
        checkAuth().then((res) => {
            if (res) navigate("/home");
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await authFetch(
            "http://localhost:3001/api/user/signup",
            "post",
            {
                username,
                password,
                email,
            }
        );
        const json = res.data;
        if (json.success) {
            localStorage.token = json.token;
            navigate("/home");
        } else {
            setServerMsg(json.message);
        }
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
                            Sign Up
                        </Text>
                        <FormLabel alignSelf="start">Username</FormLabel>
                        <Input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        ></Input>
                        <FormLabel alignSelf="start">Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                        <FormLabel alignSelf="start">Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></Input>
                        {serverMsg !== "" && (
                            <Text fontWeight="medium" color="red.300">
                                {serverMsg}
                            </Text>
                        )}
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

export default SignupPage;
