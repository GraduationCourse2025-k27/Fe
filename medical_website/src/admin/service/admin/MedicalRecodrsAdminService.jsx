import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const createRecords = async (Records) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      API_BASE_URL + "/medicalRecord/create",
      Records,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateRecords = async (idRecords, Records) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/medicalRecord/update/${idRecords}`,
      Records,
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

export const getAllRecordsByDoctor = async (idDoctor, namePatient) => {
  try {
    const token = localStorage.getItem("jwt");
    let query =
      API_BASE_URL + `/medicalRecord/listRecordByDoctor?doctorId=${idDoctor}`;
    let flag = true;
    if (namePatient != "") {
      query += (flag ? "&" : "") + "namePatient=" + namePatient;
      flag = false;
    }
    const response = await api.get(query, {
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

export const findRecordsById = async (idRecords) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/medicalRecord/search/${idRecords}`,
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
