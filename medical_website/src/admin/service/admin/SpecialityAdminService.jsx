import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const createSpeciality = async (speciality) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      API_BASE_URL + "/speciality/create",
      speciality,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/speciality/update/${idspeciality}`,
      speciality,
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

export const deleteSpeciality = async (idspeciality) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.delete(
      API_BASE_URL + `/speciality/delete/${idspeciality}`,
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

export const findSpecialityById = async (idspeciality) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/speciality/search/${idspeciality}`,
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

export const getAllByName = async (nameSpeciality) => {
  try {
    const token = localStorage.getItem("jwt");
    let query = API_BASE_URL + `/speciality/searchName`;
    let flag = true;
    if (nameSpeciality != "") {
      query += (flag ? "?" : "&") + "name=" + nameSpeciality;
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
