import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllAppointments = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/appointment/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllAppointmentsRefund = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + "/appointment/list/canceled",
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

export const appointmentConfirm = async (idAppointment) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/appointment/confirm/${idAppointment}`,
      {},
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
export const appointmentCompleted = async (idAppointment) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/appointment/complete/${idAppointment}`,
      {},
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
