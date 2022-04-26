const express = require("express");
const InitiateMongoServer = require("./config/db");
const main = require("./routes/main.js");
const user = require("./routes/user.js");
const courses = require("./routes/courses.js");
const dotenv = require("dotenv");

InitiateMongoServer();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API works" });
});

app.use("/", main);
app.use("/user", user);
app.use("/courses", courses);

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});
