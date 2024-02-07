import axios from "axios";

export const sendApplication = async (opportunityId, data) => {
    try {
        const url = `${process.env.REACT_APP_BASE_URI}/applications/?opportunityId=${opportunityId}`;
        const response = await axios.post(url, data);
        console.log(response.data.payload);
        return response.data.payload;
    } catch (error) {
        console.error(error);
    }
}