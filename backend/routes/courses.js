const express = require("express");
const ScoreCard = require("../models/ScoreCard.js");
const Course = require("../models/Course.js");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.get("/view", async (req, res) => {
    // view scoreCard information for a particular course.
    const courseName = req.query.courseName;
    if (typeof courseName !== "string")
        return res
            .status(400)
            .json({ success: false, message: "Invalid course name." });
    try {
        const course = await Course.findOne({ name: courseName });
        if (!course)
            return res
                .status(400)
                .json({ success: false, message: "No course with that name." });
        let scoreCards = await ScoreCard.find({ course }); // frontend should handle case of no results
        return res.status(200).json({
            success: true,
            message: "Course information successfully retrieved.",
            scoreCards: scoreCards.map((card) => card.toObject()),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/list", async (req, res) => {
    // gets a list of all courses. Needed for adding scoreCards, at the course selection.
    try {
        const courses = await Course.find();
        return res.status(200).json({
            success: true,
            message: "Retrieved all courses' information.",
            courses: courses.map((course) => course.toObject()),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.post("/new", auth, async (req, res) => {
    // adds a course to the global courses
    const { name, parScorePerHole } = req.body;
    if (
        typeof name !== "string" ||
        !Array.isArray(parScorePerHole) ||
        parScorePerHole.every((v) => typeof v === "number")
    ) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid parameters." });
    }
    try {
        let course = await Course.findOne({ name });
        if (course)
            return res.status(400).json({
                success: false,
                message: "Course with that name already exists.",
            });
        course = new Course({ name, parScorePerHole });
        await course.save();
        return res
            .status(200)
            .json({ success: true, message: "Created course successfully." });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

export default router;
