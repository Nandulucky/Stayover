export default (state = null, action) => {
  switch (action.type) {
    case "AddUserData":
      return action.payload;
    default:
      return state;
  }
};
