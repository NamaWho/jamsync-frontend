import axios from "axios";

export const getApplicationById = async (id) => {
  try {
    console.log("here!");
    const url = `${process.env.REACT_APP_BASE_URI}/applications/${id}`;
    const response = await axios.get(url);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const sendApplication = async (opportunityId, data) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/applications/?opportunityId=${opportunityId}`;
    const response = await axios.post(url, data);
    console.log(response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};
