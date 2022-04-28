const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

const User = require("../models/User");
const ScoreCard = require("../models/ScoreCard.js");
const Course = require("../models/Course.js");

const router = express.Router();

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6,
        }),
        check("email", "Please Enter a Valid Email").isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const { username, password, email } = req.body;
        try {
            let user = await User.findOne({
                email,
            });
            if (user) {
                return res.status(400).json({
                    message: "User already exits",
                });
            }
            user = new User({
                username,
                password,
                email,
                scoreCards: [],
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                userID: user.id,
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 10000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: "Successfully Registered",
                        token,
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    [
        check("password", "Please enter a valid password").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { username, password } = req.body;
        try {
            let user = await User.findOne({
                username: username,
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist",
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password!",
                });

            const payload = {
                userID: user.id,
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 10000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: "Successfully Signed In",
                        token,
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error",
            });
        }
    }
);

router.post("/addScoreCard", auth, async (req, res) => {
    let { courseID, date, scorePerHole } = req.body; // date should be sent using Date.toJSON()
    date = new Date(date);
    const user = req.user;
    if (
        typeof courseID !== "string" ||
        !Array.isArray(scorePerHole) ||
        isNaN(date)
    )
        return res
            .status(400)
            .json({ success: false, message: "Invalid Parameters." });
    try {
        const course = await Course.findById(courseID);
        if (!course)
            return res
                .status(400)
                .json({ success: false, message: "No course with that ID." });
        if (scorePerHole.length !== course.numHoles)
            return res
                .status(400)
                .json({ success: false, message: "Invalid Parameters." });
        const scoreCard = new ScoreCard({
            course,
            date,
            scorePerHole,
        });
        user.scoreCards.push(scoreCard);
        await scoreCard.save();
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Added ScoreCard successfully.",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/viewCourse/:id", auth, async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    try {
        await User.populate(user, {
            path: "scoreCards",
            populate: {
                path: "course",
            },
        });

        const course = await Course.findById(id);
        if (!course)
            return res
                .status(400)
                .json({ success: false, message: "No course with that ID." });

        let scoreCards = user.scoreCards.filter(
            (card) => card.course.id === id
        );
        if (!scoreCards.length)
            return res.status(400).json({
                success: false,
                message: "No games played on that course.",
            });

        return res.status(200).json({
            // returns the necessary info for the viewCourse page to render
            success: true,
            message: "Retrieved score cards for this course.",
            courseName: course.name,
            parScorePerHole: course.parScorePerHole,
            courseScorePerHoles: scoreCards.map((card) => ({
                date: card.date,
                scorePerHole: card.scorePerHole,
                totalScore: card.totalScore,
            })),
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/home", auth, async (req, res) => {
    // returns a list of the user's scorecards. Unlike the main landing page, this doesn't sort + limit the results.
    const user = req.user;
    try {
        await User.populate(user, {
            path: "scoreCards",
            populate: {
                path: "course",
            },
        });
        const scoreCards = user.scoreCards.map((card) => ({
            courseName: card.course.name,
            date: card.date,
            parScorePerHole: card.course.parScorePerHole,
            scorePerHole: card.scorePerHole,
            totalScore: card.totalScore,
        }));
        return res.status(200).json({
            success: true,
            scoreCards,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

module.exports = router;
