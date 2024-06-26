// controllers/roomController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { Interview } from "../models/Interview.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const createInterview = asyncHandler(async (req, res) =>{

    const {role, company, experience } = req.body
    const newInterview = new Interview({
      creator: req.user,
      role: role,
      company: company,
      experience: experience
    });

    await newInterview.save();
    res.status(201).json( new ApiResponse(201, newInterview, "Interview Experience created Successfully"));

})

const getInterview = asyncHandler(async (req, res) =>{

    const interviews = await Interview.find().populate('creator');
    return res
    .status(200)
    .json(
        new ApiResponse(200, interviews, "Interview fetch successfully")
    )

})



export {
    createInterview,
    getInterview
}