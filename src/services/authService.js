import axios from "axios";

export let checkUser = async (type, user) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URI}/auth/check/${user}?type=${type}`
    );
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export let login = async (type, user, password) => {
  try {
    type = type.toLowerCase();
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URI}/auth/login`,
      { type, user, password }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export let register = async (type, payload) => {
  try {
    console.log(payload);
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URI}/${type.toLowerCase()}s/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const banUserById = async (type, id) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URI}/auth/${id}/ban?type=${type}`
    );
    return response.data.error;
  } catch (error) {
    console.error(error);
  }
};
