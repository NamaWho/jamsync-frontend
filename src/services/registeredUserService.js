import axios from "axios";

export let searchUser = async (type, id) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/${type}s/${id}`;
    const response = await axios.get(url);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowersCount = async (type, id) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/${type}s/${id}/followers`;
    const response = await axios.get(url);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingCount = async (type, id) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/${type}s/${id}/following`;
    const response = await axios.get(url);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};
