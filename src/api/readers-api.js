import {readersControl} from "src/api/index";
import {getStore} from "src/store";


readersControl.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  getStore().dispatch("readers/setResponseMessage", { isError: true, message: error.message });
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export async function getAllReaders() {
  const response = await readersControl.get('get/readers/')
  return response;
}

export async function connectNewReader(ip, port) {
  const response = await readersControl.post('connect', {
    ip,
    port
  })
  return response;
}
export async function editReader(ip, port) {
  const response = await readersControl.post('connect', {
    ip,
    port
  }) // need add prev value of ip and port readers
  return response;
}

export async function startInventory(ip, port) {
  const response = await readersControl.post('start/simple-inventory',
    {
      ip,
      port
    }
  )
  return response;
}
export async function stopInventory(ip, port) {
  const response = await readersControl.post('stop',
    {
      ip,
      port
    }
  )
  return response;
}
