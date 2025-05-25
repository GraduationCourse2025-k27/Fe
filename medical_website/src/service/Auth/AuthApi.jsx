import { useNavigate } from "react-router-dom";
import { api, API_BASE_URL } from "../../config/ApiConfig";

export const register = async (client) => {
  try {
    const register = await api.post(API_BASE_URL + `/auth/register`, client);
    if (register.status == 200) {
      localStorage.setItem("id", register.data.id);
      localStorage.setItem("email", register.data.email);
      localStorage.setItem("fullName", register.data.fullName);
      localStorage.setItem("phone", register.data.phone);
      localStorage.setItem("ROLE", register.data.role);
      localStorage.setItem("address", register.data.address);
      localStorage.setItem("jwt", register.data.jwt);
      return register.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (loginRequest) => {
  try {
    const login = await api.post(API_BASE_URL + `/auth/login`, loginRequest);
    if (login.status === 200) {
      localStorage.setItem("id", login.data.id);
      localStorage.setItem("email", login.data.email);
      localStorage.setItem("fullName", login.data.fullName);
      localStorage.setItem("phone", login.data.phone);
      localStorage.setItem("ROLE", login.data.role);
      localStorage.setItem("address", login.data.address);
      localStorage.setItem("jwt", login.data.jwt);
      if (login.data.role === "ROLE_ADMIN") {
        window.location.href = "/admin/dashboard";
      } else if (login.data.role === "ROLE_DOCTOR") {
        window.location.href = "/doctor/doctor-schedule";
      } else if (login.data.role === "ROLE_STAFF") {
        window.location.href = "/staff/appointment-management";
      } else {
        window.location.href = "/";
      }
      return login.status;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getClientByEmail = async (email) => {
  try {
    const client = await api.get(
      API_BASE_URL + `/client/search/email?email=${email}`
    );
    if (client.status === 200) {
      return client.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getClientById = async (id) => {
  try {
    const client = await api.get(API_BASE_URL + `/client/search/${id}`);
    if (client.status === 200) {
      return client.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkEmailExisting = async (email) => {
  try {
    const response = await api.get(
      API_BASE_URL + `/client/valid/email?email=${email}`
    );
    if (response.status === 204) {
      return response.status;
    } else {
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getClients = async () => {
  try {
    const clients = await api.get(API_BASE_URL + `/client/list`);
    if (clients.status === 200) {
      return clients.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateClient = async (updateClient, id) => {
  try {
    const client = await api.put(
      API_BASE_URL + `/client/update/${id}`,
      updateClient
    );
    if (client.status === 200) {
      return client.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const forgetPasswork = async (email) => {
  try {
    const response = await api.post(
      API_BASE_URL + `/auth/forgot-password`,
      email
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const logOut = () => {
  localStorage.clear();
  window.location.href = "/";
};
