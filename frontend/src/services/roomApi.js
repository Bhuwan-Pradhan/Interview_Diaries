import { toast } from "react-hot-toast";

import { setLoading} from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "../utils/api";


const {
    CROOM_API,
    GROOM_API
} = endpoints

export function createRoom( token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", CROOM_API, token, {
            Authorization: `Bearer ${token}`,
          })


      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }
      toast.success("Room Created Successfull")
    } catch (error) {

      toast.error("Room Not Created")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export const getRooms = async () => {
    let result = null
    try {
      const response = await apiConnector("GET", GROOM_API)
      if (!response?.data?.success) {
        toast.error(response.data.message)
        throw new Error("Could Not Fetch clues")
      }
      result = response?.data.data
    } catch (error) {
      console.log("GET_Room_API API ERROR............", error)
      toast.error(error.message)
    }
    return result;
  }





