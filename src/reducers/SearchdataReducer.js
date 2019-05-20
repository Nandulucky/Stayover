export default (state = null, action) => {
  switch (action.type) {
    case "AddSearchData":
      return action.payload;
    default:
      return state;
  }
};
