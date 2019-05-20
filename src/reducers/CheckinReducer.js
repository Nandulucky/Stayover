export default (state = null, action) => {
  switch (action.type) {
    case "AddCheckin":
      return action.payload;
    default:
      return state;
  }
};
