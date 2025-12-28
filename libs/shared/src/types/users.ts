import type { AppRole } from "../enums/app-role";
import type { BusinessRole } from "../enums/business-role";

export type User = {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  passwordHash: string;

  businessRoles: BusinessRole[];
  appRoles: AppRole[];

  isActive: boolean;

  createdOn: Date;
  updatedOn: Date;
};
