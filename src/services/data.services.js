import { callApi } from "./base.services";

export async function blogDataGet() {
    var serviceName = `blog`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function meetDataGet() {
    var serviceName = `meet`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function roadMapDataGet() {
    var serviceName = `roadMap`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function socialDataGet() {
    var serviceName = `social`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}