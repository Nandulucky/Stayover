export default (state = null, action) => {
  switch (action.type) {
    case "AddCheckout":
      return action.payload;
    default:
      return state;
  }
};
