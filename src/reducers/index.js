import { combineReducers } from "redux";
import HotelDataReducer from "./HotelDataReducer";
import UserDataReducer from "./UserDataReducer";
import CheckinReducer from "./CheckinReducer";
import CheckoutReducer from "./Checkouteducer";
import GuestcountReducer from "./GuestcountReducer";
import CurrentPage from "./CurrentPage";
import SaveRootNavigation from "./SaveRootNavigation";
import SearchdataReducer from "./SearchdataReducer";
import AddfavoriteReducer from "./AddfavoriteReducer";

export default combineReducers({
  UserData: UserDataReducer,
  HotelData: HotelDataReducer,
  GuestCount: GuestcountReducer,
  CheckIn: CheckinReducer,
  CheckOut: CheckoutReducer,
  CurrentPage,
  Searchdata: SearchdataReducer,
  rootNavigation: SaveRootNavigation,
  favorite: AddfavoriteReducer
});
