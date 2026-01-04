import { BUSINESS_ROLE } from "@schedulerlite/shared/src/enums/business-role";

export const DEFAULT_USER = {
  firstname: "",
  lastname: "",
  password: "",
  passwordChangedAt: new Date(),
  userRoles: [BUSINESS_ROLE.projectManager],
  id: "",
  email: "",
};
