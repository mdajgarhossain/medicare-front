import axios from "axios";
import handleError from "./handle-error";
import theCookies from "../cookies";

// MedicareApi instance.
const medicareApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  //withCredentials: true,
  headers: {
    'Authorization': `Bearer ${theCookies.get('auth_user_token')}`,
    'Content-Type': 'application/json'
  },
})

// Response interceptor of dokaneApi instance.
medicareApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    let theError = handleError(error)
    return Promise.reject(theError);
  }
)

export {
  medicareApi
}