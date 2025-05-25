import { a } from "@react-spring/web";
import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const createMedicalService = async (medicalService) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      API_BASE_URL + "/medicaltype/create",
      medicalService,
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

export const updateMedicalService = async (
  idMedicalService,
  medicalService
) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/medicaltype/update/${idMedicalService}`,
      medicalService,
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
    console.log(er);
  }
};

export const deleteMedicalServiceById = async (idMedicalService) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.delete(
      API_BASE_URL + `/medicaltype/delete/${idMedicalService}`,
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

export const findMedicalServiceById = async (idMedicalService) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/medicaltype/search/${idMedicalService}`,
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

export const getAllMedicalService = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/medicaltype/list", {
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

export const getMedicalTypeUsage = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/medicaltype/usage", {
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

export const getMedicalTypeReviews = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/medicaltype/reviews", {
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
