import axios from "axios";

export let searchUser = (type, id) =>{
    try {
        const url = `${process.env.REACT_APP_BASE_URI}/${type}s/${id}`;
        const response = axios.get(url);
        return response.payload;
    } catch (error) {
        console.error(error);
    }
}