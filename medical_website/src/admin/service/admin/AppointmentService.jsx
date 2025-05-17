import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllAppointments = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/appointment/list");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllAppointmentsRefund = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/appointment/list/canceled");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const appointmentConfirm = async (idAppointment) => {
  try {
    const response = await api.put(
      API_BASE_URL + `/appointment/confirm/${idAppointment}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const appointmentCompleted = async (idAppointment) => {
  try {
    const response = await api.put(
      API_BASE_URL + `/appointment/complete/${idAppointment}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
