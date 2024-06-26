import { toast } from "react-hot-toast";

import { setLoading} from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "../utils/api";


const {
    CINTERVIEW_API,
    GINTERVIEW_API
} = endpoints

export function createInterview(role,company,experience,type,token,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", CINTERVIEW_API,{
            role,
            company,
            experience,
            type
        }, {
            Authorization: `Bearer ${token}`,
          })


      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }
      toast.success("Interview Experience Created Successfull")
      navigate("/home")
    } catch (error) {

      toast.error("Interview Experience Not Created")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export const getInterviews = async () => {
    let result = null
    try {
      const response = await apiConnector("GET", GINTERVIEW_API)
      if (!response?.data?.success) {
        toast.error(response.data.message)
        throw new Error("Could Not Fetch interviews")
      }
      result = response?.data.data
    } catch (error) {
      console.log("GET_Inteview_API API ERROR............", error)
      toast.error(error.message)
    }
    return result;
  }





