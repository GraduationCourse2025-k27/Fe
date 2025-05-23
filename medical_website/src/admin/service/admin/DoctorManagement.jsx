import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllDoctorByNameAndSpeciality = async (
  SpecialityDoctor,
  nameDoctor
) => {
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
export const getClientsByRoleUser = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/client/role-user");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createDoctor = async (doctor) => {
  try {
    const response = await api.post(API_BASE_URL + "/doctor/create", doctor);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const findDoctorById = async (idDoctor) => {
  try {
    const response = await api.get(API_BASE_URL + `/doctor/search/${idDoctor}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateDoctorById = async (idDoctor, Doctor) => {
  try {
    const response = await api.put(
      API_BASE_URL + `/doctor/update/${idDoctor}`,
      Doctor
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteDoctorById = async (idDoctor) => {
  try {
    const response = await api.delete(
      API_BASE_URL + `/doctor/delete/${idDoctor}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllSpeciality = async () => {
  const response = await api.get(API_BASE_URL + "/speciality/list");
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const getClientById = async (idClient) => {
  try {
    const response = await api.get(API_BASE_URL + `/client/search/${idClient}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAppoinmentsByDoctorId = async (idDoctor) => {
  try {
    const response = await api.get(
      API_BASE_URL + `/appointment/confirmed/doctor/${idDoctor}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
