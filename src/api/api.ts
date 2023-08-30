import axios from "axios";

export default axios.create({
    baseURL:"http://crane.otpzlab.com:7070/api/"
    // baseURL:"http://127.0.0.1:5018/api"
    // baseURL: "http://154.49.243.54:5011"
})      