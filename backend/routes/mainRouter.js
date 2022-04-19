import express from "express";
const router = express.Router();

router.get("/view", async (req, res) => {
    // get a list of universities stored in the DB
});

router.get("/query", async (req, res) => {
    // get a list of universities, but filtered + sorted based on the inputs to a form
});

export default router;
