import axios from "axios";

const baseURL = "http://192.168.1.178:8764"
// const baseURL = "http://eam.interid.ru:8764";
// const baseURL = "http://192.168.1.95:8765";
//
export async function auth(data, unionUrl) {

  let dataToSend;
  if (unionUrl){
    dataToSend = { login :data.login, password: data.password,  url: unionUrl.value }
    console.log(dataToSend);
  }
  else {
    dataToSend = data
  }
  await axios
    .post(`${baseURL}/api/auth/`, dataToSend, {
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

  let newRowForSend = {}

  console.log(headerTable);

  if (headerTable === "Ридеры") {
    path = "save-reader";
  } else {
    path = "save-antenna";



  }

  axios
    // .post(`http://localhost:8764/api/${path}`, newRow, {
    .post(`${baseURL}/api/${path}`, newRow, {
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

export async function getOrganizations() {
  let data;
  await axios
    .get(`${baseURL}/api/organizations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      data = response.data;
    });
  return data;
}

export async function getBaseUrlFromProp() {
  let data;
  await axios
    .get(`${baseURL}/api/unionUrl/`, {

    })
    .then((response) => {
      data = response.data;
    });
  return data;
}
