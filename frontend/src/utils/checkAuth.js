import authFetch from "./authFetch";
const checkAuth = async () => {
    const res = await authFetch(
        "http://localhost:3001/api/user/checkAuth",
        "get"
    );
    return res.data.success;
};

export default checkAuth;
