import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const createSpeciality = async (speciality) => {
  try {
    const response = await api.post(
      API_BASE_URL + "/speciality/create",
      speciality
    );
    if (response.status === 201) {
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateSpeciality = async (idspeciality, speciality) => {
  try {
    const response = await api.put(
      API_BASE_URL + `/speciality/update/${idspeciality}`,
      speciality
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteSpeciality = async (idspeciality) => {
  try {
    const response = await api.delete(
      API_BASE_URL + `/speciality/delete/${idspeciality}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const findSpecialityById = async (idspeciality) => {
  try {
    const response = await api.get(
      API_BASE_URL + `/speciality/search/${idspeciality}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllByName = async (nameSpeciality) => {
  try {
    let query = API_BASE_URL + `/speciality/searchName`;
    let flag = true;
    if (nameSpeciality != "") {
      query += (flag ? "?" : "&") + "name=" + nameSpeciality;
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
