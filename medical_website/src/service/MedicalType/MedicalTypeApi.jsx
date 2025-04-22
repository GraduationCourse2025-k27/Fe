import { api, API_BASE_URL } from "../../config/ApiConfig";

export const findAllMedicalTypeByNameService = async (nameService) => {
  const response = await api.get(
    API_BASE_URL + `/medicaltype/search/list?medicalType=${nameService}`
  );
  try {
    if (response.status === 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const getAllMedicalType = async () => {
  const response = await api.get(API_BASE_URL + "medicaltype/list");
  try {
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const createMedicalTypeService = async (medicalType) => {
  const response = await api.post(
    API_BASE_URL + "medicaltype/create",
    medicalType
  );
  try {
    if (response.status === 201) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const updateMedicalTypeService = async (medicalType, id) => {
  const response = await api.put(`medicaltype/update/${id}`, medicalType);
  try {
    if (response.status === 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const findMedicalTypeById = async (id) => {
  const response = await api.get(`medicaltype/search/${id}`);
  try {
    if (response.status === 200) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const deleteMedicalById = async (id) => {
  const response = await api.delete(`medicaltype/delete/${id}`);
  try {
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};
