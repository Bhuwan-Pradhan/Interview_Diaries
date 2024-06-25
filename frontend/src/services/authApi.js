import { toast } from "react-hot-toast";

import { setLoading, setToken, setUser } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "../utils/api";
import Cookies  from 'universal-cookie';

const {
  SIGNUP_API,
  LOGIN_API,
} = endpoints

export function signUp( formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API,formData,
        {
          "Content-Type": "multipart/form-data",
        })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)

      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.data.accessToken));
      dispatch(setUser(response.data.data.user));
      const cookies = new Cookies();
      cookies.set("token", response.data.data.accessToken);
      cookies.set("user", response.data.data.user);
      navigate("/home")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





