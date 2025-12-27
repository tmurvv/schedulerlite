// src/api/create-api-client.ts
export const createApiClient = () => {
  const getBaseUrl = () => {
    const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!configuredBaseUrl) {
      throw new Error("Missing VITE_API_BASE_URL");
    }

    return String(configuredBaseUrl).replace(/\/$/, "");
  };

  const safeParseJson = async (response: Response) => {
    const responseText = await response.text();
    if (!responseText) {
      return undefined;
    }

    try {
      return JSON.parse(responseText);
    } catch {
      return { raw: responseText };
    }
  };

  const requestJson = async ({
    body,
    method,
    path,
    headers,
  }: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    body?: unknown;
    headers?: Record<string, string>;
  }) => {
    const baseUrl = getBaseUrl();
    const requestUrl = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

    const requestHeaders: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(headers ?? {}),
    };

    const requestInit: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body !== undefined && method !== "GET") {
      requestInit.body = JSON.stringify(body);
    }

    const response = await fetch(requestUrl, requestInit);

    const responseBody = await safeParseJson(response);

    if (!response.ok) {
      const messageFromBody =
        typeof responseBody === "object" && responseBody !== null
          ? (responseBody as any).error || (responseBody as any).message
          : undefined;

      const fallbackMessage = `Request failed: ${method} ${path} (${response.status})`;
      const errorMessage = messageFromBody
        ? String(messageFromBody)
        : fallbackMessage;

      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).body = responseBody;
      throw error;
    }

    return responseBody;
  };

  return { requestJson };
};
