import mongoose from "mongoose";

// properties below are just some ideas for things people might want to filter colleges by
const UniversitySchema = mongoose.Schema({
    averageGPA: {
        type: Number,
        required: true,
    },
    // Not required as some schools are starting to exclude them
    averageSAT: {
        type: Number,
    },
    averageACT: {
        type: Number,
    },
    ISTuitionRange: {
        // in state
        type: mongoose.Schema.Types.ObjectId,
        ref: "NumberRange",
        required: true,
    },
    OOSTuitionRange: {
        // out of state
        type: mongoose.Schema.Types.ObjectId,
        ref: "NumberRange",
        required: true,
    },
    INTTuitionRange: {
        // international
        type: mongoose.Schema.Types.ObjectId,
        ref: "NumberRange",
        required: true,
    },
    acceptanceRate: {
        type: Number,
        required: true,
    },
    SFRatio: {
        // student-faculty ratio
        type: Number,
        required: true,
    },
    region: {
        // East Coast, West Coast, etc.
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

// probably some virtual properties such as average rating, frequently used tags

export default mongoose.model("University", UniversitySchema);
