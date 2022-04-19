import mongoose from "mongoose";

const NumberRangeSchema = mongoose.Schema({
    lower: {
        type: Number,
        required: true,
    },
    upper: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("NumberRange", NumberRangeSchema);
