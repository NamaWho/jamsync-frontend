import axios from "axios";

export let searchOpportunity = async (id) =>{
    try {
        const url = `${process.env.REACT_APP_BASE_URI}/opportunities/${id}`;
        const response = await axios.get(url);
        return response.data.payload;
    } catch (error) {
        console.error(error);
    }
}

export const createOpportunity = async (data) => {
    try {
        const url = `${process.env.REACT_APP_BASE_URI}/opportunities/`;
        const response = await axios.post(url, data);
        console.log(response.data.payload);
        return response.data.payload;
    } catch (error) {
        console.error(error);
    }
}

export const deleteOpportunityById = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASE_URI}/opportunities/${id}`;
        const response = await axios.delete(url);
        return response.data.error;
    } catch (error) {
        console.error(error);
    }
}

export const getSuggestedOpportunities = async (id, type) => {
    try {
        // retrieve user
        const userUrl = `${process.env.REACT_APP_BASE_URI}/${type}s/${id}`;
        const userResponse = await axios.get(userUrl);
        const user = userResponse.data.payload;

        // retrieve suggested opportunities
        const url = `${process.env.REACT_APP_BASE_URI}/${type}s/suggestedOpportunities`;
        const response = await axios.post(url, user);
        return response.data.payload;
    } catch (error) {
        console.error(error);
    }
}