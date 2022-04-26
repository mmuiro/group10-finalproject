import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({ msg: "Not logged in!" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.userID);
        if (!req.user) return res.status(401).json({ msg: "Invalid token!" });
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Server Error" });
    }
};

export { auth, JWT_SECRET };
