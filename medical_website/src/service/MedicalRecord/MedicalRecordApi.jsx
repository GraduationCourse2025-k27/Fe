import React from "react";
import { api, API_BASE_URL } from "../../config/ApiConfig";

export const getRecordsByClientId = async (clientId) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/medicalRecord/listRecordByClient?clientId=${clientId}`,
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
    console.error(error);
  }
};

export const getRecordById = async (idRecord) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/medicalRecord/search/${idRecord}`,
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
    console.error(error);
  }
};
