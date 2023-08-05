import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function useHttpClient<T>() {
  const [apiResponse, setApiResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchDataFromApi = async (url: string, options?: RequestInit) => {
    setApiResponse({ data: null, error: null, loading: true });

    try {
      const data = await fetchData<T>(url, options);
      setApiResponse({ data, error: null, loading: false });
    } catch (error: any) {
      setApiResponse({ data: null, error, loading: false });
    }
  };

  const get = (url: string, headers?: HeadersInit) =>
    fetchDataFromApi(url, { method: "GET", headers });

  const post = (url: string, body: any, headers?: HeadersInit) =>
    fetchDataFromApi(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

  const update = (url: string, body: any, headers?: HeadersInit) =>
    fetchDataFromApi(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

  const del = (url: string, headers?: HeadersInit) =>
    fetchDataFromApi(url, { method: "DELETE", headers });

  return { apiResponse, get, post, update, del };
}

export default useHttpClient;
