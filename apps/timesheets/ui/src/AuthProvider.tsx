import { useEffect, useState } from "react";

import {SimpleSpinner} from "./components/SimpleSpinner";

export const AuthProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

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
                window.location.href = "http://localhost:5173"; // auth login
                return;
            }

            const payloadBase64 = token.split(".")[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            console.log("decoded", decodedPayload)
            const expiresAtMs = decodedPayload.exp * 1000;
            const isExpired = Date.now() >= expiresAtMs;

            if (isExpired) {
                localStorage.removeItem("authToken");
                window.location.href = "http://localhost:5173"; // auth login
                return;
            }

            setIsReady(true);
        };

        run().then();
    }, []);

    if (!isReady) {
    return (
      <SimpleSpinner />
    );
  }

  return children;
};
