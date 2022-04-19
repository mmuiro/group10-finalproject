import express from "express";
import mongoose from "mongoose";
import reviewRouter from "./routes/reviewRouter.js";

mongoose.connect("mongodb://localhost:27127/app_name");
const port = 3000;
const db = mongoose.connection;
const app = express();
db.on("open", () => console.log("Connected to Mongo."));

// probably a line for user auth middleware
app.use(express.json());
app.use("/api/", mainRouter);
app.use("/api/review", reviewRouter);
app.listen(port, () => console.log(`Server running on port ${port}.`));
