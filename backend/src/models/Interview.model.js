import mongoose, {Schema} from "mongoose";

const interviewSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User" 
        },
        role: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)


export const Interview = mongoose.model("Interview", interviewSchema)
