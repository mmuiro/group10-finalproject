const express = require("express");
const router = express.Router();
const ScoreCard = require("../models/ScoreCard.js");

router.get("/landing", async (req, res) => {
    // retrieves a list of the best 10 score cards, sorted by ascending score (best to worst).
    try {
        let bestScoreCards = await ScoreCard.find();
        bestScoreCards.sort((a, b) => a.totalScore - b.totalScore);
        bestScoreCards = bestScoreCards.slice(0, 10); // somewhat inefficient, but we can't sort by virtuals
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

module.exports = router;
