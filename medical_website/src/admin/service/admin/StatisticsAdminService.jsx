import React from "react";
import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const countByAll = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/statistic/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCurrentYearRevenue = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + "/statistic/revenue/current-year",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/statistic/current-year", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const Top5DoctorForBest = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/statistic/reviews/Top5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
