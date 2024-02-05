import axios from "axios";

export let searchUsers = (params) =>{
    try {
        const response = axios.post(`${process.env.REACT_APP_BASE_URI}/users/search`, params);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export let searchOpportunities = (params) =>{
    try {
        const response = axios.post(`${process.env.REACT_APP_BASE_URI}/opportunities/search`, params);
        return response;
    } catch (error) {
        console.error(error);
    }
}