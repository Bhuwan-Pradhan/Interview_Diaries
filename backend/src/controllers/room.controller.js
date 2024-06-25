// controllers/roomController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Room } from "../models/room.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from 'uuid';



const createRoom = asyncHandler(async (req, res) =>{


    const existingRoom = await Room.findOne({ creator: req.user });
    if (existingRoom) {
      throw new ApiError(409, "User already created a Room")
    }

    const roomID = uuidv4();
    const newRoom = new Room({
      roomID,
      creator: req.user,
    });

    await newRoom.save();
    res.status(201).json( new ApiResponse(201, newRoom, "room created Successfully"));

})

const getRooms = asyncHandler(async (req, res) =>{

    const rooms = await Room.find().populate('creator');
    return res
    .status(200)
    .json(
        new ApiResponse(200, rooms, "Rooms fetch successfully")
    )

})



export {
    createRoom,
    getRooms
}