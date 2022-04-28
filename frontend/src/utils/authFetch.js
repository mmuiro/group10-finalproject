import axios from "axios";

const authFetch = async (url, method, body = null) => {
    const token = localStorage.getItem("token");
    let config = { method, url, headers: {} };
    if (body) {
        config.data = body;
        config.headers["Content-Type"] = "application/json";
    }
    if (token) {
        config.headers.token = token;
    }
    return await axios(config);
};

export default authFetch;
