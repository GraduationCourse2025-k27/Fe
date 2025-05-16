import React from "react";
import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const countByAll = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/statistic/count");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCurrentYearRevenue = async () => {
  try {
    const response = await api.get(
      API_BASE_URL + "/statistic/revenue/current-year"
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCurrentYearAppointments = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/statistic/current-year");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const Top5DoctorForBest = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/statistic/reviews/Top5");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
