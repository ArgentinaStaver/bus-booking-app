import { UserModel } from "./UserModel";
import { UserResponseModel } from "./UserResponseModel";

export const mapUserResponseToModel = (user: UserResponseModel): UserModel => {
    return ({
      id: user.id,
      email: user.email,
      phone: user.phone,
      lastName: user.lastname,
      firstName: user.firstname,
      active: user.active,
      company: {
        id: user.company.id,
        name: user.company.name
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
    });
  };
  