export const AddUserData = userData => {
  return {
    type: "AddUserData",
    payload: userData
  };
};

export const AddHotelData = hotelData => {
  return {
    type: "AddHotelData",
    payload: hotelData
  };
};

export const AddCheckin = checkindate => {
  return {
    type: "AddCheckin",
    payload: checkindate
  };
};

export const AddCheckout = checkoutdate => {
  return {
    type: "AddCheckout",
    payload: checkoutdate
  };
};

export const AddGuestCount = GuestCount => {
  return {
    type: "AddGuestCount",
    payload: GuestCount
  };
};

export const CurrentPage = pagename => {
  return {
    type: "CurrentPagename",
    payload: pagename
  };
};

export const SaveRootNavigation = navigationobject => {
  return {
    type: "SaveRootNavigation",
    payload: navigationobject
  };
};

export const AddSearchData = searchdata => {
  return {
    type: "AddSearchData",
    payload: searchdata
  };
};

export const AddFavorites = favdata => {
  return {
    type: "AddFavorites",
    payload: favdata
  };
};
