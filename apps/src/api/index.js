import axios from "axios"
let request = axios.create({
    baseURL:"/api",
    timeout:5000
})
export default request