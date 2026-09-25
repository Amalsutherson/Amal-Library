const API_URL = "http://127.0.0.1:8000/api/auth";

let accessToken = null;

let refreshPromise = null;


export function setAccessToken(token) {
  accessToken = token;
}


export function getAccessToken() {
  return accessToken;
}


export function clearAccessToken() {
  accessToken = null;
}


export async function registerUser(data) {

  const response = await fetch(
    `${API_URL}/register/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {

    const firstError =
      result.username?.[0] ||
      result.email?.[0] ||
      result.password?.[0] ||
      result.password2?.[0] ||
      result.non_field_errors?.[0] ||
      "Registration failed.";

    throw new Error(firstError);
  }

  setAccessToken(result.access);

  return result;
}


export async function loginUser(data) {

  const response = await fetch(
    `${API_URL}/login/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {

    throw new Error(
      result.non_field_errors?.[0] ||
      result.detail ||
      "Invalid username/email or password."
    );
  }

  setAccessToken(result.access);

  return result;
}


export async function refreshAccessToken() {

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = fetch(
    `${API_URL}/refresh/`,
    {
      method: "POST",

      credentials: "include",
    }
  )
    .then(async (response) => {

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail ||
          "Session expired."
        );
      }

      setAccessToken(result.access);

      return result.access;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}


export async function getCurrentUser() {

  const response = await apiFetch(
    `${API_URL}/me/`
  );

  return response.user;
}


export async function logoutUser() {

  try {

    await fetch(
      `${API_URL}/logout/`,
      {
        method: "POST",
        credentials: "include",
      }
    );

  } finally {

    clearAccessToken();
  }
}


export async function apiFetch(
  url,
  options = {},
  retry = true
) {

  const headers = new Headers(
    options.headers || {}
  );

  if (accessToken) {

    headers.set(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }

  const response = await fetch(
    url,
    {
      ...options,
      headers,
      credentials: "include",
    }
  );

  if (
    response.status === 401 &&
    retry
  ) {

    try {

      await refreshAccessToken();

      return apiFetch(
        url,
        options,
        false
      );

    } catch (error) {

      clearAccessToken();

      throw error;
    }
  }

  const contentType =
    response.headers.get("content-type");

  if (
    contentType &&
    contentType.includes("application/json")
  ) {

    return response.json();
  }

  return response;
}