export default (state = [], action) => {
  switch (action.type) {
    case "AddFavorites":
      return action.payload;
    default:
      return state;
  }
};
