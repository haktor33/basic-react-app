import { callApi } from "./base.services";

async function login(username, password) {
    var serviceName = "login";
    try {
        let response = await callApi(serviceName, { method: "POST", data: JSON.stringify({ username, password })});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function logout() {
    sessionStorage.clear();
    localStorage.removeItem("token");
}

export const authService = { login, logout };