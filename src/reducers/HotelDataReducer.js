export default (state = null, action) => {
  switch (action.type) {
    case "AddHotelData":
      return action.payload;
    default:
      return state;
  }
};
