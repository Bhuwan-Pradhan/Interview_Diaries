import mongoose, {Schema} from "mongoose";

const roomSchema = new Schema(
    {
        roomID: {
            type: String,
            required: true,
            unique: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User" 
        },
    },
    {
        timestamps: true
    }
)


export const Room = mongoose.model("Room", roomSchema)
