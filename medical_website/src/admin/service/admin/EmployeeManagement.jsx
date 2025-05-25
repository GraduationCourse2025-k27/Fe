import { to } from "@react-spring/web";
import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllEmployee = async (fullName) => {
  try {
    const token = localStorage.getItem("jwt");
    let query = API_BASE_URL + "/customersupport/list";
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

export const createEmployee = async (employee) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(
      API_BASE_URL + "/customersupport/create",
      employee,
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
    console.error(error);
  }
};

export const updateEmployee = async (employee, idEmployee) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/customersupport/update/${idEmployee}`,
      employee,
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

export const findEmployeeById = async (idEmployee) => {
  try {
    const token = localStorage.getItem("jwt");
    const resposne = await api.get(
      API_BASE_URL + `/customersupport/find/${idEmployee}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resposne.status === 200) {
      return resposne.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deletedEmployeeId = async (idEmployee) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.delete(
      API_BASE_URL + `/customersupport/delete/${idEmployee}`,
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
