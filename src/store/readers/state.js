export default function () {
  return {
    readers: [
      {
        api: 'someApi1',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name1",
      },
      {
        api: 'someApi2',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name2",
      },
      {
        api: 'someApi3',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name3",
      },
      {
        api: 'someApi4',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name4",
      }
    ],
    isLoading: false,
    responseMessage: null
  };
}
