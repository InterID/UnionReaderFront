import {readersControl} from "src/api/index";
import {getStore} from "src/store";


readersControl.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  getStore().dispatch("readers/setResponseMessage", {isError: true, message: error.message});
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export async function getAllReaders() {
  const response = await readersControl.get('')
  return response;
}

export async function connectNewReader(ip, port) {
  const response = await readersControl.post('', {
      ip,
      port
    },
    {
      headers: {"content-type": "application/json"}
    })
  return response;
}

export async function deleteReader(ip, port) {
  const response = await readersControl.delete(`ip/${ip}/port/${port}`);
  return response;
}

export async function connectReader(ip, port) {
  const response = await readersControl.post(`ip/${ip}/port/${port}/connect`, {
  });
  return response;
}

export async function disconnectReader(ip, port) {
  const response = await readersControl.post(`ip/${ip}/port/${port}/disconnect`);
  return response;
}

export async function startInventory(ip, port) {
  const response = await readersControl.post(`ip/${ip}/port/${port}/start-inventory`);
  return response;
}

export async function stopInventory(ip, port) {
  const response = await readersControl.post(`ip/${ip}/port/${port}/stop-inventory`);
  return response;
}
export async function downloadLogs() {
  const response = await readersControl.get(`logs`, {
    responseType: 'arraybuffer',
  });
  return response;
}
