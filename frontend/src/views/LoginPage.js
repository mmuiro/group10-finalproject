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

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        checkAuth().then((res) => {
            if (res) navigate("/home");
        });
    }, []);

    const handleSubmit = (e) => {
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
                            Login
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
                        <Divider />
                        <Button colorScheme="green">Submit</Button>
                    </VStack>
                </FormControl>
            </Box>
        </Flex>
    );
};

export default LoginPage;
