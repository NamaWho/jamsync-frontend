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