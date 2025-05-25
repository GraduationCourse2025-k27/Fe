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
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/client/role-user", {
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
export const createDoctor = async (doctor) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(API_BASE_URL + "/doctor/create", doctor, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/doctor/update/${idDoctor}`,
      Doctor,
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

export const deleteDoctorById = async (idDoctor) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.delete(
      API_BASE_URL + `/doctor/delete/${idDoctor}`,
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

export const getAllSpeciality = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/speciality/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/client/search/${idClient}`,
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

export const getAppoinmentsByDoctorId = async (idDoctor) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/appointment/confirmed/doctor/${idDoctor}`,
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
