const express = require("express");
const router = express.Router();
const ScoreCard = require("../models/ScoreCard.js");

router.get("/landing", async (req, res) => {
    // retrieves a list of the best 10 score cards, sorted by ascending score (best to worst).
    try {
        const bestScoreCards = await ScoreCard.find()
            .sort({ totalScore: "asc" })
            .limit(10); // gets the 10 scoreCards with the lowest score
        return res.status(200).json({
            success: true,
            message: "Retrieved landing page info.",
            bestScoreCards: bestScoreCards.map((card) => card.toObject()),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

export default router;
