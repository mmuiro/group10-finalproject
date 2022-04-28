const express = require("express");
const InitiateMongoServer = require("./config/db");
const main = require("./routes/main.js");
const user = require("./routes/user.js");
const courses = require("./routes/courses.js");
const dotenv = require("dotenv");
const cors = require("cors");

InitiateMongoServer();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.get("/api", (req, res) => {
    res.json({ message: "API works" });
});

app.use("/api/", main);
app.use("/api/user", user);
app.use("/api/courses", courses);

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});
