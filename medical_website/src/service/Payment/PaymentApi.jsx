import { api, API_BASE_URL } from "../../config/ApiConfig";

export const paymentDirect = async (appointment, amount) => {
  const response = await api.post(
    API_BASE_URL + `/payment/appointment/${appointment}?amount=${amount}`
  );
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
