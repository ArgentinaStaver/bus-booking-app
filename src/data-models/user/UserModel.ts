import { CompanyModel } from "../companies/CompanyModel";

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
  company: Pick<CompanyModel, "id" | "name">;
  createdAt: string;
  updatedAt: string;
  role: {
    id: string;
    name: string;
  };
}
