import { ResponseModel } from "../ResponseModel";

export interface AuthResponseModel {
    token: string;
}

export default interface AuthResponse extends ResponseModel {
    data?: AuthResponseModel;
}
