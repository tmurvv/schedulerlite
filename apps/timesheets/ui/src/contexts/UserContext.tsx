import { createContext, ReactNode, useContext } from "react";

import type { AppRole } from "@schedulerlite/shared/dist/enums/app-role";
import type { BusinessRole } from "@schedulerlite/shared/dist/enums/business-role";

type UserProviderProps = {
  children: ReactNode;
  value: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    businessRoles: BusinessRole[];
    appRoles: AppRole[];
  };
};

export const UserProvider = ({ children, value }: UserProviderProps) => {
  const fullName = `${value.firstName} ${value.lastName}`;

  return (
    <UserContext.Provider
      value={{
        ...value,
        fullName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export type UserContextInput = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    businessRoles: BusinessRole[];
    appRoles: AppRole[];
};

export type UserContextValue = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    businessRoles: BusinessRole[];
    appRoles: AppRole[];
};

export const UserContext = createContext<UserContextValue | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
