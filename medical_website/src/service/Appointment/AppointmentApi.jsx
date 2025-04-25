import { api, API_BASE_URL } from "../../config/ApiConfig";

export const bookAppointment = async (scheduleId, appointment) => {
  const response = await api.post(
    API_BASE_URL + `/appointment/reserve?ScheduleId=${scheduleId}`,
    appointment
  );
  try {
    if (response.status === 200) {
      console.log(response.data);

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
};
