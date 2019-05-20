export default (state = null, action) => {
  switch (action.type) {
    case "SaveRootNavigation":
      return action.payload;
    default:
      return state;
  }
};
