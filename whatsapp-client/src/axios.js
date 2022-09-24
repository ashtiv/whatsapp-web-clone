import axios from "axios";

const instance = axios.create({
    baseURL: "https://serverforwhatsapp.herokuapp.com/"
});
export default instance;