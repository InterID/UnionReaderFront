export default {
 SET_IS_LOADING(state,payload) {
    state.isLoading = payload;
 },
  SET_RESPONSE_MESSAGE(state,payload){
   state.responseMessage = payload;
  },
  SET_READERS(state, payload) {
    state.readers = payload;
  }
}
