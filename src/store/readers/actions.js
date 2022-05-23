import {
  connectNewReader,
  getAllReaders,
  startInventory,
  stopInventory,
  deleteReader,
  connectReader,
  disconnectReader,
  downloadLogs
} from "src/api/readers-api";

let modalTimeout;

const responseHandler = (data, dispatch, action, isFetchReaders = false) => {
  if (data.success === false) {
    const responseMessage =
      {
        isError: true,
        message: `error:${data.errorCode} ${data.errorMessage}`
      }
    dispatch("setResponseMessage", responseMessage);
    return;
  }
  if (!isFetchReaders) {
    const responseMessage =
      {
        isError: false,
        message: action
      }
    dispatch("setResponseMessage", responseMessage);
    dispatch("fetchReaders");
  }
}

export default {
  async fetchReaders({commit, dispatch}) {
    commit("SET_IS_LOADING", true);
    try {
      const result = await getAllReaders();
      responseHandler(result.data, dispatch, null, true)
      commit("SET_READERS", result.data.value);
      commit("SET_IS_LOADING", false);
    } catch {
      commit("SET_IS_LOADING", false);
    }
  },
  async addReader({dispatch}, {api, port}) {
    const result = await connectNewReader(api, port);
    responseHandler(result.data, dispatch, "Reader has been added!");
  },
  async deleteReader({dispatch}, {api, port}) {
    const result = await deleteReader(api, port);
    responseHandler(result.data, dispatch, "Reader has been deleted!");
  },
  async connectReader({dispatch}, {api, port}) {
    const result = await connectReader(api, port);
    responseHandler(result.data, dispatch, "Successful connection!");
  },
  async disconnectReader({dispatch}, {api, port}) {
    const result = await disconnectReader(api, port);
    responseHandler(result.data, dispatch, "Successful disconnection!");
  },

  async startInventory({dispatch}, {api, port}) {
    const result = await startInventory(api, port);
    responseHandler(result.data, dispatch, "Start Inventory!");
  },
  async stopInventory({dispatch}, {api, port}) {
    const result = await stopInventory(api, port);
    responseHandler(result.data, dispatch, "Stop Inventory!");
  },
  async downloadLogs({dispatch}) {
    const result =  await downloadLogs();
    responseHandler(result.data, dispatch, "Download logs!", true);
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'logs.log');
    document.body.appendChild(link);
    link.click();
  },
  setResponseMessage({commit, dispatch}, payload) {
    dispatch("clearModalTimeout");
    commit("SET_RESPONSE_MESSAGE", payload);// payload = {isError: Boolean, message: String}
    dispatch("hideModal");
  },
  clearModalTimeout() {
    clearTimeout(modalTimeout);
  },
  hideModal({commit}) {
    modalTimeout = setTimeout(() => {
      commit("SET_RESPONSE_MESSAGE", null);
    }, 5000);
  }
}
