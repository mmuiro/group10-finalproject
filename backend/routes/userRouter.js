import express from "express";
const router = express.Router();

router.post("/register", async (req, res) => {
    // register user
});

router.post("/login", async (req, res) => {
    // login user
});

router.get("/unis", async (req, res) => {
    // view saved universities
});

router.post("/addUni", async (req, res) => {
    // add a university to user's saved list
});

router.get("/reviews", async (req, res) => {
    // view posted reviews
});
