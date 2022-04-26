import mongoose from "mongoose";

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

export default mongoose.model("ScoreCard", scoreCardSchema);
