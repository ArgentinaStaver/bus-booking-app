import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { ACCESS_TOKEN } from "../utils/constants";

export const getToken = async () => await Preferences.get({ key: ACCESS_TOKEN });

const setHeader = async (config: any) => {
    const token = await getToken();
    const { headers } = config;

    const h = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      }
    
      return { ...config, headers: { ...headers, ...h } };
}

const http = axios.create();

http.interceptors.request.use(setHeader, (error) => Promise.reject(error));

http.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        Preferences.remove({ key: ACCESS_TOKEN })
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default http;
