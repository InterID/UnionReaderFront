import axios from "axios";

const baseURL = "http://192.168.1.178:8764";

export async function auth(data) {
  await axios
    .post(`${baseURL}/api/auth/`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((response) => {
      axios.defaults.headers.common["Authorization"] = "Bearer" + response.data;
      localStorage.setItem("token", response.data);
    });
}

export async function getSettings() {
  let data;
  await axios
    .get(`${baseURL}/api/settings/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      params
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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function saveDevice(newRow, headerTable) {
  let data;

  let path;

  console.log(headerTable);

  if (headerTable === "Ридеры") {
    path = "save-reader";
  } else {
    path = "save-antenna";
  }

  axios
    .post(`http://localhost:8764/api/${path}`, newRow, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      data = response.data.nameId;
    });


  console.log(data)
  return data;
}
