const mongoose = require("mongoose");

const scoreCardSchema = mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    scorePerHole: [
        {
            type: Number,
        },
    ],
});

scoreCardSchema.virtual("totalScore").get(function () {
    return this.scorePerHole.reduce((a, b) => a + b);
});

module.exports = mongoose.model("ScoreCard", scoreCardSchema);
