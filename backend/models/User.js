const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        uniqueCaseInsensitive: true,
    },
    scoreCards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ScoreCard",
        },
    ],
});

userSchema.virtual("gamesPlayed").get(function () {
    return this.scoreCards.length;
});

userSchema.virtual("averageScore").get(function () {
    let scores = this.scoreCards.map((card) => card.totalScore);
    return scores.reduce((a, b) => a + b) / this.scoreCards.length;
});

module.exports = mongoose.model("User", userSchema);
