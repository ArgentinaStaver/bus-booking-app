import mapCarResponseToModel from '../data-models/cars/mapCarResponseToModel';
import { CarsResponse } from '../data-models/cars/CarResponseModel';
import http from '../services/httpWrappers';
import { REACT_APP_API_BASE_URL } from '../utils/constants';

const baseUrl = REACT_APP_API_BASE_URL;

export const getAllCars = async (): Promise<CarsResponse> => {
  try {
    const { data, status } = await http.get(`${baseUrl}/fleet`);

    return { data: data.map(mapCarResponseToModel), status};
  } catch (error) {
    return { data: [], status: (error as any).response.status };
  }
}
