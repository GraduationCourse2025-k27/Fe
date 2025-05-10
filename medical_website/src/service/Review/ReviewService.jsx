import { api, API_BASE_URL } from "../../config/ApiConfig";

export const assessDoctor = async (review) => {
  try {
    const response = await api.post(API_BASE_URL + "/review/assess", review);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const listReviewByDoctor = async (doctorId) => {
  try {
    const response = await api.get(API_BASE_URL + `/review/list/${doctorId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};
