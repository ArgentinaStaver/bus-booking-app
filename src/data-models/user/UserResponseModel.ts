import { CompanyModel } from "../companies/CompanyModel";
import { ResponseModel } from "../ResponseModel";
import { UserModel } from "./UserModel";

export interface UserResponseModel {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  company: Pick<CompanyModel, "id" | "name">;
  active: boolean;
  role: {
    id: string;
    name: string;
  };
}

export default interface UserResponse extends ResponseModel {
  data?: UserModel;
}

export interface UsersResponse extends ResponseModel {
  data: UserModel[];
}
