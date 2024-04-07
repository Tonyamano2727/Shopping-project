import axios from "../axios";
export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data : data
})
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data : data
})
export const apiForgotPassword = (data) => axios({
    url: '/user/forgotpassword',
    method: 'post',
    data : data
})

export const apiResetPassword = (data) => axios({
    url: '/user/resetpassword',
    method: 'put',
    data : data
})

export const apigetcurrent = () => axios({
    url: '/user/current',
    method: 'get',
})