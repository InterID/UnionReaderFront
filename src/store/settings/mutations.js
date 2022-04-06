export function SET_BASE_URL_STATE(state, value) {
  console.log("MUTATION", value);
  state.baseUrl = value;
}
