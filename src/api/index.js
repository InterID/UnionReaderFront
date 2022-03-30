import axios from "axios";
const baseURL = "http://192.168.1.178:8764";

export async function auth(data) {
  await axios
    .post(`${baseURL}/api/auth/`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      axios.defaults.headers.common["Authorization"] = "Bearer" + response.data;
      localStorage.setItem("token", response.data);
    });
}

export function getSettings() {
  axios
    .get(`${baseURL}/api/settings/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export function postSettings(settings) {
  axios
    .post(`${baseURL}/api/settings/`, settings, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    });
}
export async function getLocations(location, params) {
  axios
    .get(`${baseURL}/api/${location}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    })
    .then((response) => {
      locationsList.value = response.data;
    });
}

export async function getReaders() {
  await axios
    .get(`${baseURL}/api/readers/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      //readersList.value = response.data;
    });
}
