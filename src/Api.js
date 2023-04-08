import axios from "axios";

const API_URL = "http://localhost:5000/";

const Api = axios.create({
    baseURL: API_URL,
})

export default Api;