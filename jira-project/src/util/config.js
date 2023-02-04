import { history } from '../app';
import axios from "axios"
import { isExpired } from "react-jwt";

<<<<<<<< HEAD:jira-project/src/util/config.js
export const DOMAIN = 'https://jiranew.cybersoft.edu.vn'
export const ACCESS_TOKEN = "accessToken"
export const USER_LOGIN = 'userLogin'
========
export const TOKEN_CYBER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c'
export const DOMAIN = 'https://jiranew.cybersoft.edu.vn/'
export const ACCESS_TOKEN = "accessToken"
export const USER_LOGIN = "userLogin"
export const USER_PROFILE = "userProfile"
export const USER_REGISTER = "userRegister";
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000,
});
<<<<<<<< HEAD:jira-project/src/util/config.js


http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: ` Bearer ${settings.getStore(ACCESS_TOKEN)} `,
        TokenCybersoft: TOKEN_CYBER
    }
    return config;
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.resspone?.status === 401 || err.resspone?.status === 403) {
        const isMyTokenExpried = settings.getStore(ACCESS_TOKEN)
        console.log(isMyTokenExpried)
        if (isMyTokenExpried) {
            alert("Phiên đăng nhập hết hạn")
            settings.clearStorage(ACCESS_TOKEN)
            window.location.href = `/`
        }
        history.push('/')
    }
    return Promise.reject(err)
========
http.interceptors.request.use((response) => {
    
    response.headers = {
        ...response.headers,
        Authorization: `${getStore(ACCESS_TOKEN)}`,
        TokenCybersoft: TOKEN_CYBER,
      };
      return response;
}, (error) => {
    return Promise.reject(error)
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
})

http.interceptors.response.use(
    (result)=>{
        return result;
    },
    (error)=>{
        if (error.response?.status === 400 || error.response?.status === 404)
            {history.push("/")}
        if (error.response?.status === 401 || error.response?.status === 403) {
            const isMyTokenExpired = isExpired(getStore(ACCESS_TOKEN));
            if (isMyTokenExpired) {
                alert("Hết phiên đăng nhập yêu cầu đăng nhập lại !");
                clearStorage(ACCESS_TOKEN);
                clearStorage(USER_LOGIN);
                window.location.href = "/login";
            }
            history.push("/login");
        }
        return Promise.reject(error)
    }
)

<<<<<<<< HEAD:jira-project/src/util/config.js
export const settings = {
    setStorageJson: (name, data) => {
========

export const {setStorage, setStorageJson, getStorageJson, getStore, setCookieJson, getCookieJson, setCookie, getCookie, clearStorage, eraseCookie} = {
    setStorageJson: (name, data)=> {
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name, data) => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name) => {
        if (localStorage.getItem(name)) {
            const dataStore = localStorage.getItem(name);
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore);
                return data;
            }
            return undefined;
        }
        return;
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
<<<<<<<< HEAD:jira-project/src/util/config.js
            const data = localStorage.getItem(name);
========
            const data= localStorage.getItem(name);
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
            return data;
        }
        return;
    },
    setCookieJson: (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
<<<<<<<< HEAD:jira-project/src/util/config.js
    setCookie: (name, value, days) => {
========
    setCookie: (name, value, days)  => {
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
<<<<<<<< HEAD:jira-project/src/util/config.js
    getCookie: (name) => {
========
    getCookie: (name)=> {
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
<<<<<<<< HEAD:jira-project/src/util/config.js
    clearStorage: (name) => {
========
    clearStorage: (name ) => {
>>>>>>>> origin/createTask:jira-project/src/util/config.jsx
        localStorage.removeItem(name);
    }

}



