const mongoose = require("mongoose");

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

module.exports = mongoose.model("Course", courseSchema);
