import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
        unique: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    universities: [
        // list of universities the user has saved to their profile
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "University",
        },
    ],
});

export default mongoose.model("User", UserSchema);
