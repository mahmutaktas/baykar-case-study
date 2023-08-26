import { API_URL } from "@/config";

export const register = async (registerData) => {
    const res = await fetch(`${API_URL}api/user/register/`, {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: { "Content-Type": "application/json" },
    });
    return res;
};

export const login = async (loginData) => {
    const res = await fetch(`${API_URL}api/user/login/`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
    });
    return res;
};

export const refreshAccessToken = async (tokenData) => {
    const res = await fetch(`${API_URL}api/user/login/refresh/`, {
        method: "POST",
        body: JSON.stringify(tokenData),
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    return res;
};
