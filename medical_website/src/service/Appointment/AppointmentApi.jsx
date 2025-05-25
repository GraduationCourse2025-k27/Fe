import { api, API_BASE_URL } from "../../config/ApiConfig";

export const bookAppointment = async (scheduleId, appointment) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      API_BASE_URL + `/appointment/reserve?ScheduleId=${scheduleId}`,
      appointment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};

export const getAllAppointmentByEmail = async (email) => {
  try {
    if (email != null) {
      const response = await api.get(
        API_BASE_URL + `/appointment/list-appointment-by-email?email=${email}`,
        {}
      );
      if (response.status === 200) {
        return response.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const cancelAppointment = async (idAppointment) => {
  try {
    const token = localStorage.getItem("jwt");
    if (!idAppointment) {
      throw new Error("ID lịch hẹn không hợp lệ");
    }
    const response = await api.put(
      `${API_BASE_URL}/appointment/cancel/${idAppointment}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error("Lỗi khi hủy lịch hẹn:", error);
    throw error;
  }
};
