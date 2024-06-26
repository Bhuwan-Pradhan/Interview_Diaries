const BASE_URL = "http://localhost:8000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/login",
  CROOM_API: BASE_URL + "/rooms/create",
  GROOM_API: BASE_URL + "/rooms/get",
  CINTERVIEW_API: BASE_URL + "/interviews/create",
  GINTERVIEW_API: BASE_URL + "/interviews/get"
}




 