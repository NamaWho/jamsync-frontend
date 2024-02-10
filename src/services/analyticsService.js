import { logDOM } from "@testing-library/react";
import axios from "axios";

export const fetchTop5Publishers = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URI + "/users/topPublishers"
    );
    return res.data.payload;
  } catch (error) {
    console.log("Error fetching top 5 publishers", error);
  }
};

export const fetchTop5AppliedOpportunities = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URI + "/opportunities/topAppliedOpportunities"
    );
    return res.data.payload;
  } catch (error) {
    console.log("Error fetching top 5 applied opportunities", error);
  }
};

export const fetchOpportunitiesByAgeRange = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URI + "/opportunities/opportunitiesByAgeRange"
    );
    return res.data.payload;
  } catch (error) {
    console.log("Error fetching opportunities by age range", error);
  }
};

export const fetchTopLocations = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URI + "/opportunities/topLocations"
    );
    return res.data.payload;
  } catch (error) {
    console.log("Error fetching top locations", error);
  }
};

export const fetchTopGenres = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_URI + "/opportunities/topGenres"
    );
    return res.data.payload;
  } catch (error) {
    console.log("Error fetching top genres", error);
  }
};
