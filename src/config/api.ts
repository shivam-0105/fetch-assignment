import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Add request interceptor to ensure credentials are sent
api.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export const authAPI = {
  login: async (name: string, email: string) => {
    const response = await api.post("/auth/login", { name, email });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
  
  checkAuth: async () => {
    try {
      const response = await api.get("/dogs/breeds");
      return { authenticated: true, data: response.data };
    } catch (error) {
      return { authenticated: false, error };
    }
  }
};

export const dogsAPI = {
  getBreeds: async () => {
    const response = await api.get("/dogs/breeds");
    return response.data;
  },
  
  searchDogs: async (params: any) => {
    const response = await api.get("/dogs/search", { params });
    return response.data;
  },
  
  getDogsByIds: async (ids: string[]) => {
    const response = await api.post("/dogs", ids);
    return response.data;
  },

  match: async (favoriteDogIds: string[]): Promise<{ match: string }> => {
    const response = await api.post("/dogs/match", favoriteDogIds);
    return response.data;
  },
};

export const locationsAPI = {
  getLocations: async (zipCodes: string[]) => {
    const response = await api.post("/locations", zipCodes);
    return response.data;
  }
}

export default api;