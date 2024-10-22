import axios from "axios";

export default class ApiManager {
    axiosClient = axios.create();

    constructor() {
        this.init();
    }

    init() {
        this.axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;

        this.axiosClient.defaults.headers.common = {
            // 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'skip-browser-warning', //NOTE causing CORS problems, server has to allow this header (FIXED)
            //'Access-Control-Allow-Headers': '*',
        };

        
    }

    async get(url, options = {}) {
        //console.log(url);
        return this.axiosClient.get(url, options).then(response => response);
    }

    async post(url, payload, options = {}) {
        //console.log(url, "payload: ", payload);
        return this.axiosClient.post(url, payload, options).then(response => response);
    }

    async delete(url, payload, options = {}) {
        //console.log(url, "payload: ", payload);
        return this.axiosClient.delete(url, options).then(response => response);
    }
}