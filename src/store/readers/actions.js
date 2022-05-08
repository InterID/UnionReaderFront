import {connectNewReader, getAllReaders, startInventory, stopInventory} from "src/api/readers-api";

let modalTimeout;

export default {
  async fetchReaders(context){
   const result = await getAllReaders();
    console.log(context, result)
  },
  async connectNewReader(context, {api, port}) {
   const result = await connectNewReader(api,port);
    console.log(result);
  },
  async startInventory(context, {api, port}) {
   const result = await startInventory(api, port);
   console.log(result)
  },
  async stopInventory(context, {api, port}) {
   const result = await stopInventory(api, port);
   console.log(result)
  },
  setResponseMessage({commit, dispatch}, payload){
    commit("SET_RESPONSE_MESSAGE", payload);
    dispatch("hideModal")
  },
  clearModalTimeout() {
    clearTimeout(modalTimeout);
  },
  hideModal({commit}){
    modalTimeout = setTimeout(() => {
      commit("SET_RESPONSE_MESSAGE", null);
    }, 5000)
  }
}
