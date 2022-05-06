export default function () {
  return {
    readers: [
      {
        ip: 'someApi1',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
      },
      {
        ip: 'someApi2',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
      },
      {
        ip: 'someApi3',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
      },
      {
        ip: 'someApi4',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
      }
    ],
    isLoading: false,
    responseMessage: null
  };
}
