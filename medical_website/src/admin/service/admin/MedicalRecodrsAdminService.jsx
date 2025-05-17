import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const createRecords = async (Records) => {
  try {
    const response = await api.post(
      API_BASE_URL + "/medicalRecord/create",
      Records
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
    const response = await api.put(
      API_BASE_URL + `/medicalRecord/update/${idRecords}`,
      Records
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
    let query =
      API_BASE_URL + `/medicalRecord/listRecordByDoctor?doctorId=${idDoctor}`;
    let flag = true;
    if (namePatient != "") {
      query += (flag ? "&" : "") + "namePatient=" + namePatient;
      flag = false;
    }
    const response = await api.get(query);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const findRecordsById = async (idRecords) => {
  try {
    const response = await api.get(
      API_BASE_URL + `/medicalRecord/search/${idRecords}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
