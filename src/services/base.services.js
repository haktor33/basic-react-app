//import { history } from '../utils/history';
import { dummyDatas } from './dummy.datas';
const { apiUrl, dummyDataActive } = window['runConfig'];

export async function callApi(serviceName, options) {
    if (dummyDataActive) {
        return Promise.resolve(dummyDatas[serviceName]);
    } else {
        return await _callApi(serviceName, options || {});
    }
}

async function _callApi(serviceName, options) {
    let method = options.method ? options.method : 'GET';
    let headers;
    if (!serviceName.endsWith("token")) {
        const sessionUserData = JSON.parse(sessionStorage.getItem('netigmaAuth'));
        const token = sessionUserData ? sessionUserData.user.access_token : "";
        headers = { "Authorization": `Bearer ${token}` };
    }

    if (options.contentType === "form-data") {
        headers = { ...headers, "Content-Type": "application/x-www-form-urlencoded" }
    } else if (options.contentType === "multipart") {
        // STOP! Do not add the following header! It automatically appends this header with some extra info
    } else {
        headers = { ...headers, "Content-Type": "application/json" }
    }

    const requestOptions = {
        method: method,
        body: options.data,
        headers: headers
    };

    let data;
    try {
        const response = await window.fetch(`${apiUrl}/${serviceName}`, requestOptions);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //history.push({
                //    pathname: `/`,
                //    search: `?${window.location.pathname}`,
                //    state: { referrer: window.location.pathname }
                //});
                window.location.reload(true);
            }
            data = await response.json();
            return Promise.reject(data);
        }
        data = await response.json();
        return data;
    } catch (err) {
        return Promise.reject(err.message ? err.message : data);
    }
}











