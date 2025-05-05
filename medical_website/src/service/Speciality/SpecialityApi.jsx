import { api, API_BASE_URL } from "../../config/ApiConfig";

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

export const createSpeiciality = async (speaciality) => {
  const response = await api.post(
    API_BASE_URL + "/speciality/create",
    speaciality
  );
  try {
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const updateSpeciality = async (speaciality, id) => {
  const response = await api.put(
    API_BASE_URL + `/speciality/update/${id}`,
    speaciality
  );
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const findSpeacialityById = async (idSpeciality) => {
  const response = await api.get(
    API_BASE_URL + `/speciality/search/${idSpeciality}`
  );
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};
