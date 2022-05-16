import {
  connectNewReader,
  getAllReaders,
  startInventory,
  stopInventory,
  deleteReader,
  connectReader
} from "src/api/readers-api";

let modalTimeout;

const responseHandler = (data, dispatch, isFetchReaders = false) => {
  if (data.success === false) {
    const responseMessage =
      {
        isError: true,
        message: `error:${data.errorCode} ${data.errorMessage}`
      }
    dispatch("setResponseMessage", responseMessage);
  } else {
    if (!isFetchReaders) dispatch("fetchReaders");
  }
}

export default {
  async fetchReaders({commit, dispatch}) {
    commit("SET_IS_LOADING", true);
    try {
      const result = await getAllReaders();
      responseHandler(result.data, dispatch, true)
      commit("SET_READERS", result.data.value);
      commit("SET_IS_LOADING", false);
    } catch {
      commit("SET_IS_LOADING", false);
    }

  },
  async addReader({dispatch}, {api, port}) {
    const result = await connectNewReader(api, port);
    responseHandler(result.data, dispatch)
  },
  async deleteReader({dispatch}, {api, port}) {
    const result = await deleteReader(api, port);
    responseHandler(result.data, dispatch)
  },
  async connectReader({dispatch}, {api, port}) {
    const result = await connectReader(api, port);
    responseHandler(result.data, dispatch)
  },

  async startInventory({dispatch}, {api, port}) {
    const result = await startInventory(api, port);
    responseHandler(result.data, dispatch)
  },
  async stopInventory({dispatch}, {api, port}) {
    const result = await stopInventory(api, port);
    responseHandler(result.data, dispatch)
  },
  setResponseMessage({commit, dispatch}, payload) {
    commit("SET_RESPONSE_MESSAGE", payload);// payload = {isError: Boolean, message: String}
    dispatch("hideModal")
  },
  clearModalTimeout() {
    clearTimeout(modalTimeout);
  },
  hideModal({commit}) {
    modalTimeout = setTimeout(() => {
      commit("SET_RESPONSE_MESSAGE", null);
    }, 5000)
  }
}
