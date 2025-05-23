import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllAccount = async () => {
  try {
    const response = await api.get(API_BASE_URL + "/client/list");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const lockAccount = async (idAccount) => {
  try {
    const response = await api.put(API_BASE_URL + `/client/${idAccount}/lock`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const unLockAccount = async (idAccount) => {
  try {
    const response = await api.put(
      API_BASE_URL + `/client/${idAccount}/unlock`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllAccountByName = async (fullName) => {
  try {
    let query = API_BASE_URL + "/client/getAccounts";
    let flag = true;
    if (fullName != "") {
      query += (flag ? "?" : "&") + "fullName=" + fullName;
    }
    const response = await api.get(query);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
