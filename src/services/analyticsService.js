import { logDOM } from "@testing-library/react";
import axios from "axios";

export const fetchTop5Publishers = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URI + '/users/topPublishers');
        return res.data.payload;
    } catch (error) {
        console.log('Error fetching top 5 publishers', error);
    }
}