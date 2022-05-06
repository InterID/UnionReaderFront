import {readersControl} from "src/api/index";

export async function getAllReaders() {
  const response = await readersControl.get('get/readers/')
  return response.data;
}

export async function connectNewReader(api, port) {
  const response = await readersControl.post('connect', {
    api,
    port
  })
  return response.data;
}

export async function startInventory(api, port) {
  const response = await readersControl.post('start/simple-inventory',
    {
      api,
      port
    }
  )
  return response
}
export async function stopInventory(api, port) {
  const response = await readersControl.post('stop',
    {
      api,
      port
    }
  )
  return response
}
