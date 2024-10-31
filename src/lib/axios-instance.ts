import axios from "axios";
import { config as environmentVariables } from "../config";
// import { signOut } from 'next-auth/react'
// import { toast } from "@/hooks";

axios.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json";
  config.baseURL = environmentVariables.VITE_API_URL;
  return config;
});

// axios.interceptors.response.use(response => response, async error => {
// 	if (error.response?.data?.message === 'Unauthorized') {
// 		const xid = localStorage.getItem('xid')
// 		if (xid) {
// 			localStorage.removeItem('xid')
// 			setTimeout(() => {
// 				toast({
// 					title: 'Sesión expirada',
// 					variant: 'error',
// 				})
// 				signOut({ callbackUrl: '/login' })
// 			}, 1000)
// 		}
// 	}

// 	return Promise.reject(error)
// })

export default axios;
