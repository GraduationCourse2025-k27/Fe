import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllAccount = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + "/client/list", {
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

export const lockAccount = async (idAccount) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/client/${idAccount}/lock`,
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

export const unLockAccount = async (idAccount) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/client/${idAccount}/unlock`,
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

export const getAllAccountByName = async (fullName) => {
  try {
    const token = localStorage.getItem("jwt");
    let query = API_BASE_URL + "/client/getAccounts";
    let flag = true;
    if (fullName != "") {
      query += (flag ? "?" : "&") + "fullName=" + fullName;
    }
    const response = await api.get(query, {
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
