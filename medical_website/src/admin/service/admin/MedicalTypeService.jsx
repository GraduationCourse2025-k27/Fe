import { a } from "@react-spring/web";
import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const createMedicalService = async (medicalService) => {
  try {
    const response = await api.post(
      API_BASE_URL + "/medicaltype/create",
      medicalService
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMedicalService = async (
  idMedicalService,
  medicalService
) => {
  try {
    const response = await api.put(
      API_BASE_URL + `/medicaltype/update/${idMedicalService}`,
      medicalService
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(er);
  }
};

export const deleteMedicalServiceById = async (idMedicalService) => {
  try {
    const response = await api.delete(
      API_BASE_URL + `/medicaltype/delete/${idMedicalService}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const findMedicalServiceById = async (idMedicalService) => {
  try {
    const response = await api.get(
      API_BASE_URL + `/medicaltype/search/${idMedicalService}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllMedicalService = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/medicaltype/list");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalTypeUsage = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/medicaltype/usage");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalTypeReviews = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/medicaltype/reviews");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
