import { api, API_BASE_URL } from "../../../config/ApiConfig";

export const getAllNews = async (supportId) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(
      API_BASE_URL + `/news/list?SupportId=${supportId}`,
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

export const createNews = async (News) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.post(API_BASE_URL + "/news/create", News, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateNews = async (News, idNews) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.put(
      API_BASE_URL + `/news/update/${idNews}`,
      News,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {}
};

export const findNewsById = async (idNews) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get(API_BASE_URL + `/news/find/${idNews}`, {
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

export const deleteNewsById = async (idNews) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.delete(API_BASE_URL + `/news/delete/${idNews}`, {
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
