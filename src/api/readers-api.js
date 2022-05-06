import {readersControl} from "src/api/index";

export async function getAllReaders() {
  const response = await readersControl.get('get/readers/')
  return response.data;
}

export async function connectNewReader(ip, port) {
  const response = await readersControl.post('connect', {
    ip,
    port
  })
  return response.data;
}
export async function editReader(ip, port) {
  const response = await readersControl.post('connect', {
    ip,
    port
  }) // need add prev value of ip and port readers
  return response.data;
}

export async function startInventory(ip, port) {
  const response = await readersControl.post('start/simple-inventory',
    {
      ip,
      port
    }
  )
  return response
}
export async function stopInventory(ip, port) {
  const response = await readersControl.post('stop',
    {
      ip,
      port
    }
  )
  return response
}
