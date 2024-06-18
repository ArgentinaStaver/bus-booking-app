import { ResponseModel } from '../data-models/ResponseModel';
import AuthResponse from '../data-models/authentication/AuthResponseModel';
import { CredentialsModel } from '../data-models/authentication/CredentialsModel';
import http from '../services/httpWrappers';
import { REACT_APP_API_BASE_URL } from '../utils/constants';

const baseUrl = REACT_APP_API_BASE_URL;

export const authenticate = async (credentials: CredentialsModel): Promise<AuthResponse> => {
    try {
        const { data, status } = await http.post(`${baseUrl}/login`, credentials);

        return { data, status };
    } catch (error) {
        return { status: 404 };
    }
}

export const invalidateToken = async (token: string): Promise<ResponseModel> => {
    try {
        const { data, status } = await http.post(`${baseUrl}/logout`, { token });

        return { status };
    } catch (error) {
        return { status: 404 };
    }
}
