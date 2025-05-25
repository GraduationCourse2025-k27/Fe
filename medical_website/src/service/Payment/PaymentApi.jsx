import { api, API_BASE_URL } from "../../config/ApiConfig";

export const paymentDirect = async (appointment, amount) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      API_BASE_URL + `/payment/appointment/${appointment}?amount=${amount}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const createPaymentVnPay = async (appointment) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      `/payment/vn-pay/${appointment}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API VNPAY:", error);
    throw error;
  }
};

export const updatePaymentVnPay = async (
  appointment,
  vnPayResponse,
  vnPayBankTranNo,
  vnPayTransactionNo,
  vnPayTransactionStatus
) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      `/payment/online/vn-pay-callback/${appointment}?vnp_ResponseCode=${vnPayResponse}&vnp_BankTranNo=${vnPayBankTranNo}&vnp_TransactionNo=${vnPayTransactionNo}&vnp_TransactionStatus=${vnPayTransactionStatus}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 202) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
