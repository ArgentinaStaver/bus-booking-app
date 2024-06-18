import http from "../services/httpWrappers";
import { REACT_APP_API_BASE_URL } from "../utils/constants";
import UserResponse, {
  UsersResponse,
} from "../data-models/user/UserResponseModel";
import { mapUserResponseToModel } from "../data-models/user/mapUserResponseToModel";

const baseUrl = REACT_APP_API_BASE_URL;

export const getUser = async (userId: string): Promise<UserResponse> => {
  try {
    const { data, status } = await http.get(`${baseUrl}/user/${userId}`);

    return { data: mapUserResponseToModel(data), status };
  } catch (error) {
    return { status: 404 };
  }
};

export const getUsers = async (): Promise<UsersResponse> => {
  try {
    const { data, status } = await http.get(`${baseUrl}/user`);

    return { data: (data || []).map(mapUserResponseToModel), status };
  } catch (error) {
    return { data: [], status: 404 };
  }
};
