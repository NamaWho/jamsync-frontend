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

export const getMembers = async (id) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/bands/${id}/members`;
    const response = await axios.get(url);

    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const checkFollow = async (id, userId, type) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/musicians/${id}/checkFollow?userId=${userId}&type=${type}`;
    const response = await axios.get(url);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const follow = async (id, userId, type) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/musicians/${id}/follow?userId=${userId}&type=${type}`;
    const response = await axios.post(url);
    return response.data.error;
  } catch (error) {
    console.error(error);
  }
};

export const unfollow = async (id, userId, type) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/musicians/${id}/unfollow?userId=${userId}&type=${type}`;
    const response = await axios.post(url);
    return response.data.error;
  } catch (error) {
    console.error(error);
  }
};
