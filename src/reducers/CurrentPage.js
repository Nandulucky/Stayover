export default (state = null, action) => {
  switch (action.type) {
    case "CurrentPagename":
      return action.payload;
    default:
      return state;
  }
};
