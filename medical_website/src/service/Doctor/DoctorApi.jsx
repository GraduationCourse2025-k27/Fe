import { api, API_BASE_URL } from "../../config/ApiConfig";

export const getAllDoctor = async (SpecialityDoctor, nameDoctor) => {
  let query = API_BASE_URL + `/doctor/list`;
  let flag = true;
  if (SpecialityDoctor !== -1) {
    query += (flag ? "?" : "&") + "id=" + SpecialityDoctor;
    flag = false;
  }
  if (nameDoctor !== "") {
    query += (flag ? "?" : "&") + "name=" + nameDoctor;
    flag = false;
  }
  const response = await api.get(query);
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const createDoctor = async (Doctor) => {
  const response = await api.post(API_BASE_URL + "/doctor/create", Doctor);
  try {
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};
export const updateDoctor = async (Doctor, id) => {
  const response = await api.put(API_BASE_URL + `/doctor/update/${id}`, Doctor);
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const findDoctorById = async (id) => {
  const response = await api.get(API_BASE_URL + `/doctor/search/${id}`);
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const deleteDoctorById = async (id) => {
  const response = await api.delete(API_BASE_URL + `/doctor/delete/${id}`);
  try {
    return response.status;
  } catch (error) {
    console.log(error);
    return response;
  }
};
