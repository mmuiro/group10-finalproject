import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
    },
    tags: [
        /*  tags include things like "Competitive", "Social", "Easy to Pick Classes", etc.
            Likely also store a list of possible tags */
        {
            type: String,
        },
    ],
    content: {
        type: String,
    },
});

export default mongoose.model("Review", ReviewSchema);
