import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parScorePerHole: [
        {
            type: Number,
        },
    ],
});

courseSchema.virtual("numHoles").get(function () {
    return this.parScorePerHole.length;
});

export default mongoose.model("Course", courseSchema);
