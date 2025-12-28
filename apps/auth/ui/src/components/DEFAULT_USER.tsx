import { UserRoles } from "../../enums/UserRoles";

export const DEFAULT_USER = {
  firstname: "",
  lastname: "",
  password: "",
  passwordChangedAt: new Date(),
  userRoles: [UserRoles.PROJECT_MANAGER],
  id: "",
  email: "",
};
