import axios from "axios";
import { Notify } from 'quasar'
// const baseURL = "http://192.168.1.178:8764"
// const baseURL = "http://eam.interid.ru:8282";
// const baseURL = "http://localhost:8282";
// const baseURL = "http://192.168.1.95:8765";
// const baseURL = "https://localhost:8282";
const baseURL = "http://9090.union-eam.ru:8282";
//

export const readersControl = axios.create({
    baseURL: `${baseURL}/api/rfid`,
    timeout: 1000,
    headers: { "content-type": "application/json" }
  }
)

export async function auth(data, unionUrl) {
  let dataToSend;
  if (unionUrl) {
    dataToSend = {
      login: data.login,
      password: data.password,
      url: unionUrl.value,
    };
  } else {
    dataToSend = data;
  }
  await axios
    .post(`${baseURL}/api/auth/`, dataToSend, {
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      // },
    })
    .then((response) => {
      if (response.data) {
        axios.defaults.headers.common["Authorization"] = "Bearer" + response.data;
        localStorage.setItem("token", response.data);
      } else {
        localStorage.setItem("token", '');
        Notify.create({
          type: 'negative',
          message: 'Неверный логин или пароль'
        })
      }
    });
}

export async function getSettings() {
  let data;
  await axios
    .get(`${baseURL}/api/settings/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export function postSettings(settings) {
  axios
    .post(`${baseURL}/api/settings/`, settings, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getLocations(location, params) {
  let data;
  await axios
    .get(`${baseURL}/api/${location}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
      params,
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function getReaders() {
  let data;
  await axios
    .get(`${baseURL}/api/readers/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function getAntennas(readerName) {
  let data;
  await axios
    .get(`${baseURL}/api/antennas?readerName=${readerName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function saveDevice(newRow, headerTable) {
  let data;

  let path;

  let newRowForSend = {};

  if (headerTable === "Ридеры") {
    path = "save-reader";
  } else {
    path = "save-antenna";
  }

  axios
    // .post(`http://localhost:8764/api/${path}`, newRow, {
    .post(`${baseURL}/api/${path}`, newRow, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      data = response.data.nameId;
    });

  return data;
}

export async function getOrganizations() {
  let data;
  await axios
    .get(`${baseURL}/api/organizations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function getResponsible() {
  let data;
  await axios
    .get(`${baseURL}/api/system-responsible`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function getBaseUrlFromProp() {
  let data;
  await axios.get(`${baseURL}/api/unionUrl`, {
    // headers: {
    //
    //   "Access-Control-Allow-Origin": "*",
    // },
  }).then((response) => {
    data = response.data;
  });
  return data;
}

