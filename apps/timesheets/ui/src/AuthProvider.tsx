import { useEffect, useState } from "react";

import { SimpleSpinner } from "./components/SimpleSpinner";
import { UserProvider } from "./contexts/UserContext";

import { isBusinessRole } from "@schedulerlite/shared/dist/enums/business-role";
import { isAppRole } from "@schedulerlite/shared/dist/enums/app-role";

import type { UserContextInput } from "./contexts/UserContext";

export const AuthProvider = ({ children }) => {
    const [userValue, setUserValue] = useState<UserContextInput | null>(null);

    useEffect(() => {
        const run = async () => {
            const url = new URL(window.location.href);
            const tokenFromUrl = url.searchParams.get("tkn");

            if (tokenFromUrl) {
                localStorage.setItem("authToken", tokenFromUrl);
                url.searchParams.delete("tkn");
                window.history.replaceState({}, document.title, url.toString());
            }

            const token = localStorage.getItem("authToken");

            if (!token) {
                window.location.href = "http://localhost:5173";
                return;
            }

            const decodedPayload = (() => {
                try {
                    const payloadBase64 = token.split(".")[1];
                    return JSON.parse(atob(payloadBase64));
                } catch {
                    return null;
                }
            })();

            if (!decodedPayload || Date.now() >= decodedPayload.exp * 1000) {
                localStorage.removeItem("authToken");
                window.location.href = "http://localhost:5173";
                return;
            }

            const businessRoles =
                Array.isArray(decodedPayload.credentials?.userRoles)
                    ? decodedPayload.credentials.userRoles.filter(isBusinessRole)
                    : [];

            const appRoles =
                Array.isArray(decodedPayload.appRoles)
                    ? decodedPayload.appRoles.filter(isAppRole)
                    : [];

            setUserValue({
                userId: decodedPayload.id,
                email: decodedPayload.email,
                firstName: decodedPayload.firstname,
                lastName: decodedPayload.lastname,
                businessRoles: businessRoles.length ? businessRoles : ["Operations"],
                appRoles: appRoles.length ? appRoles : ["User"],
            });
        };

        run();
    }, []);

    if (!userValue) {
        return <SimpleSpinner />;
    }

    return <UserProvider value={userValue}>{children}</UserProvider>;
};
