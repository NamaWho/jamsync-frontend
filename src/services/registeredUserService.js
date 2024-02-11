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

export const updateUser = async (user, type) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/${type}s/${user._id}`;
    const response = await axios.put(url, user);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserById = async (type, id) => {
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_BASE_URI}/${type}s/${id}`
    );
    return response.data.error;
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

export const addMemberById = async (bandId, memberId) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/bands/${bandId}/member?memberId=${memberId}`;
    const response = await axios.post(url);
    return response.data.error;
  }
  catch (error) {
    console.error(error);
  }
}

export const deleteMemberById = async (bandId, memberId) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/bands/${bandId}/member?memberId=${memberId}`;
    const response = await axios.delete(url);
    return response.data.error;
  }
  catch (error) {
    console.error(error);
  }
}

export const getSuggestedMusiciansBySimilarities = async (id) => {
  try {
    // retrieve user
    const userUrl = `${process.env.REACT_APP_BASE_URI}/musicians/${id}`;
    const userResponse = await axios.get(userUrl);
    const user = userResponse.data.payload;

    const url = `${process.env.REACT_APP_BASE_URI}/musicians/suggestedMusiciansBySimilarities`;
    const response = await axios.post(url, user);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const getSuggestedMusiciansByNetwork = async (id) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/musicians/suggestedMusiciansByNetwork`;
    const response = await axios.post(url, id);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
}

export const getSuggestedBandsBySimilarities = async (id) => {
  try {
    // retrieve user
    const userUrl = `${process.env.REACT_APP_BASE_URI}/musicians/${id}`;
    const userResponse = await axios.get(userUrl);
    const user = userResponse.data.payload;

    const url = `${process.env.REACT_APP_BASE_URI}/musicians/suggestedBandsBySimilarities`;
    const response = await axios.post(url, user);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};

export const getSuggestedBandsByNetwork = async (id) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URI}/musicians/suggestedBandsByNetwork`;
    const response = await axios.post(url, id);
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
}