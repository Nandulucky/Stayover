import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductStyles from "./ProductStyle";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import CommonDatePickerModal from "../popupsModal/commonModals/CommonDatePickerModal";
import CommonGuest from "../popupsModal/commonModals/CommonGuest";
import ManageBookingPopup from "../popupsModal/ManageBookingPopup";
import CancellationPopup from "../popupsModal/CancellationPopup";
import CancellSuccess from "../popupsModal/CancellSuccess";
import { Spinner } from "../common";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({ ...ProductStyles });
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
let hotelDetails = null;
let checkin = null;
let checkout = null;
let guest;

let Servicefee;
let perNightTotalfee;
let Total;
let days;
let userdetails = null;
let modifyBooking = false;
let bookingData = null;

class PreviewBookingDetails extends Component {
  static defaultProps = {
    containerStyle: {}
  };
  state = {
    modalstart: false,
    modalGuestStart: false,
    modalmanagebooking: false,
    modalcancelbooking: false,
    bookingmodifysave: false,
    isLoading: false,
    modalCancellSuccess: false
  };

  SpinnerStart = value => {
    this.setState({ isLoading: value });
  };
  constructor(props) {
    super(props);
    hotelDetails = this.props.AllData.HotelData;
    checkin = this.props.AllData.CheckIn;
    checkout = this.props.AllData.CheckOut;
    userdetails = this.props.AllData.UserData;
    this.resetPage = this.resetPage.bind(this);
    this.modifyConfirmDate = this.modifyConfirmDate.bind(this);
    this.checkBookingExists = this.checkBookingExists.bind(this);
    this.modifyDate = this.modifyDate.bind(this);
    guest = this.props.AllData.GuestCount;
    modifyBooking = this.props.navigation.getParam("modifyBooking", false);
    bookingData = this.props.navigation.getParam("bookingData", false);
  }

  setSuccesscancelModalVisible = visible => {
    this.setState({ modalCancellSuccess: visible });
  };
  setmanagebookModalVisible = visible => {
    this.setState({ modalmanagebooking: visible });
  };

  setcancelModalVisible = visible => {
    this.setState({ modalcancelbooking: visible });
  };
  BookingmodifyClose = () => {
    this.setState({ bookingmodifysave: true, modalmanagebooking: false });
  };
  setdateModalVisible = visible => {
    this.setState({ modalstart: visible });
  };
  setGuestModalVisible = visible => {
    this.setState({ modalGuestStart: visible });
  };

  async modifyDate() {
    const response = await axios
      .post(
        "https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/booking/modify",
        {
          prevBookingInfo: bookingData,
          newCheckInDate: this.props.AllData.CheckIn,
          newCheckOutDate: this.props.AllData.CheckOut,
          guests: this.props.AllData.GuestCount,

          userDetails: {
            userId: userdetails.userID,
            userName: userdetails.name,
            userEmail: userdetails.email,
            userContact: userdetails.phone_number
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userdetails.idtoken,
            Token: userdetails.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(response => {
        // handle success
        if (response.data.statusCode) {
          this.modifyConfirmDate();
        }

        this.SpinnerStart(false);
      })
      .catch(error => {
        console.log(error.response);

        this.SpinnerStart(false);
      });
  }

  async modifyConfirmDate() {
    newBookingData = bookingData;
    newBookingData.Booking_From_Date = this.props.AllData.CheckIn;
    newBookingData.Booking_To_Date = this.props.AllData.CheckOut;
    newBookingData.Total_Guests = this.props.AllData.GuestCount;

    const response = await axios
      .post(
        "https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/booking/modify/confirm",
        {
          existingBookingDetails: bookingData,
          newBookingDetails: newBookingData,

          userDetails: {
            userId: userdetails.userID,
            userName: userdetails.name,
            userEmail: userdetails.email,
            userContact: userdetails.phone_number
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userdetails.idtoken,
            Token: userdetails.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(response => {
        // handle success

        console.log(response);

        this.SpinnerStart(false);
      })
      .catch(error => {
        console.log(error.response);

        this.SpinnerStart(false);
      });
  }

  async checkBookingExists() {
    const response = await axios
      .post(
        "https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/booking/initiate",
        {
          //userId: userdetails.email,
          unitId: hotelDetails.Apartment_Unit_Id,
          apartmentName: hotelDetails.Apartment_Name,
          type: hotelDetails.Apartment_Type,
          apartmentAvailFromDate: hotelDetails.Apartment_Avail_From_Date,
          apartmentAvailaToDate: hotelDetails.Apartment_Avail_To_Date,
          checkInDate: new Date(checkin),
          checkOutDate: new Date(checkout),
          pricePerNight: hotelDetails.Apartment_Price_Per_Night,
          guests: guest,
          discountType: "weekly", //todo after
          cleaningFee: 40,
          stateTax: 6,
          cityTax: 7,
          serviceFee: 8,
          fullAddress: hotelDetails.Apartment_Full_Address,
          city: hotelDetails.City,
          street: hotelDetails.Street,
          state: hotelDetails.State,
          pincode: hotelDetails.Pincode,
          propertyDetails: hotelDetails,
          //  stripe_payment_details: paymentDetailsStripe,
          userDetails: {
            userId: userdetails.userID,
            userName: userdetails.name,
            userEmail: userdetails.email,
            userContact: userdetails.phone_number
          },
          totalPrice: Total
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userdetails.idtoken,
            Token: userdetails.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(response => {
        if (response.data.statusCode == false) {
          alert("Property already booked! Try with different date.");
          this.SpinnerStart(false);

          return;
        } else {
          this.props.AllData.rootNavigation.navigate("CheckoutPage", {
            Final_Total: Total,
            modifyBooking: modifyBooking,
            bookingdatawithoutconfirm: response.data
          });
        }
        // handle success
        this.setState({
          modifyBooking: this.props.navigation.getParam("modifyBooking", false)
        });
        bookingdatawithoutconfirm = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
        alert("Error in saving data! Try again.");
        this.setState({ modalstart: false });
        this.SpinnerStart(false);
      });
  }

  GetFooterButton = () => {
    if (modifyBooking) {
      if (this.state.bookingmodifysave) {
        return (
          <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              this.modifyDate();
              this.props.AllData.rootNavigation.navigate("CheckoutPage", {
                Final_Total: Total
              });
            }}
          >
            <Text style={styles.textFooter}>Modify Dates and Book</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              this.setState({ modalmanagebooking: true });
            }}
          >
            <Text style={styles.textFooter}>Manage Booking</Text>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <TouchableOpacity
          style={styles.footer}
          onPress={() => {
            hotelDetails = this.props.AllData.HotelData;
            checkin = this.props.AllData.CheckIn;
            checkout = this.props.AllData.CheckOut;
            userdetails = this.props.AllData.UserData;
            guest = this.props.AllData.GuestCount;
            if (userdetails != null) {
              this.checkBookingExists();
            } else {
              this.props.AllData.rootNavigation.navigate("Login");
            }
          }}
        >
          <Text style={styles.textFooter}>Pay ${Total}</Text>
        </TouchableOpacity>
      );
    }
  };
  renderDescription = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            marginTop: 0
          }}
        >
          <Text
            style={{
              ...styles.headerText,
              fontSize: 18,
              paddingTop: 10,
              fontFamily: "OpenSans-SemiBold"
            }}
          >
            {hotelDetails.Apartment_Name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...styles.smallpriceperNight,
                color: "#432355",
                fontWeight: "600",
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              ${hotelDetails.Apartment_Price_Per_Night}
            </Text>
            <Text
              style={{
                ...styles.smallpriceperNight,
                fontFamily: "OpenSans-Regular"
              }}
            >
              /Night
            </Text>
          </View>
        </View>

        <View style={{ width: "50%", marginTop: 10 }}>
          <Image
            source={{ uri: hotelDetails.Apartment_Image }}
            style={{ ...styles.smallcardImage, width: "100%" }}
          />
        </View>
      </View>
    );
  };
  renderDetail = () => {
    return (
      <View>
        <Text
          style={{
            ...styles.detailText,
            color: "#3d3d3d",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          My Stay Details
        </Text>
        <Text style={{ ...styles.subDetailText, color: "#808080" }}>
          3 nights in {hotelDetails.Apartment_Name}
          {", \n"}
          {hotelDetails.Apartment_Full_Address}
        </Text>
      </View>
    );
  };
  rendercheckinDetail = () => {
    return (
      <View style={{ flexDirection: "row", margin: 10 }}>
        <View style={styles.datestyle}>
          <Text style={styles.dateslected}>
            {month[new Date(checkin).getMonth()] +
              " " +
              new Date(checkin).getDate()}
          </Text>
        </View>

        <View
          style={{
            ...styles.checkindate,
            marginVertical: 20
          }}
        >
          <Text style={{ ...styles.dateshow, color: "#3d3d3d" }}>
            {weekday[new Date(checkin).getDay()]} check in
          </Text>
          <Text
            style={{
              ...styles.datetimeshow,
              color: "#3d3d3d"
            }}
          >
            After 2:00 PM
          </Text>
        </View>
      </View>
    );
  };
  rendercheckoutDetail = () => {
    return (
      <View style={{ flexDirection: "row", margin: 10, marginTop: 0 }}>
        <View style={styles.datestyle}>
          <Text style={{ ...styles.dateslected, color: "#3d3d3d" }}>
            {month[new Date(checkout).getMonth()] +
              " " +
              new Date(checkout).getDate()}
          </Text>
        </View>

        <View
          style={{
            ...styles.checkoutdate,
            marginVertical: 20
          }}
        >
          <Text style={{ ...styles.dateshow, color: "#3d3d3d" }}>
            {weekday[new Date(checkout).getDay()]} check out
          </Text>
          <Text
            style={{
              ...styles.datetimeshow,
              color: "#3d3d3d",
              margin: 0,
              alignItems: "flex-start"
            }}
          >
            Before noon
          </Text>
        </View>
      </View>
    );
  };

  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }
  renderhrfirsttag = () => {
    return <View style={styles.hrfirstline} />;
  };
  rendercheckDetail = () => {
    return (
      <View style={{ flexDirection: "row", margin: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (this.state.bookingmodifysave || !modifyBooking)
              this.setState({ modalstart: true });
          }}
          style={styles.checkinedit}
        >
          <Text style={styles.dateshow}>Check-in</Text>
          <Text
            style={{
              ...styles.selectedvalue,
              color:
                this.state.bookingmodifysave || !modifyBooking
                  ? "#432355"
                  : "#3d3d3d"
            }}
          >
            {month[new Date(checkin).getMonth()] +
              " " +
              new Date(checkin).getDate()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (this.state.bookingmodifysave || !modifyBooking)
              this.setState({ modalstart: true });
          }}
          style={styles.checkoutedit}
        >
          <Text style={styles.dateshow}>Check-out</Text>
          <Text
            style={{
              ...styles.selectedvalue,
              color:
                this.state.bookingmodifysave || !modifyBooking
                  ? "#432355"
                  : "#3d3d3d"
            }}
          >
            {month[new Date(checkout).getMonth()] +
              " " +
              new Date(checkout).getDate()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (this.state.bookingmodifysave || !modifyBooking)
              this.setState({ modalGuestStart: true });
          }}
          style={styles.checkguests}
        >
          <Text style={styles.dateshow}>Guests</Text>
          <Text
            style={{
              ...styles.selectedvalue,
              color:
                this.state.bookingmodifysave || !modifyBooking
                  ? "#432355"
                  : "#3d3d3d"
            }}
          >
            {this.props.AllData.GuestCount + " "} Guests
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderhrlasttag = () => {
    return <View style={styles.hrlastline} />;
  };

  renderinvoice = () => {
    return (
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={styles.feetextshow}>Fee & Tax Details</Text>
        <Icon
          name="info"
          type="font-awesome"
          color="#8c8b8b"
          size={15}
          style={styles.iconright}
        />
      </View>
    );
  };
  renderinvoiceprice = () => {
    const dt1 = new Date(checkin);
    const dt2 = new Date(checkout);
    days = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10
        }}
      >
        <View style={styles.invoiceprice}>
          <Text style={{ ...styles.invoicepernight, marginBottom: 5 }}>
            ${hotelDetails.Apartment_Price_Per_Night} * {days} nights
          </Text>
          <Text style={styles.invoicepernight}>Service fee</Text>
        </View>
        <View style={styles.checkoutedit} />
        <View style={styles.invoicevalue}>
          <Text style={styles.invoicepernight}>
            $
            {
              (perNightTotalfee =
                parseFloat(hotelDetails.Apartment_Price_Per_Night) *
                parseInt(days))
            }
          </Text>
          <Text style={styles.invoicepernight}>
            ${(Servicefee = (perNightTotalfee * parseFloat(8)) / 100)}
          </Text>
        </View>
      </View>
    );
  };
  saveDate = (value1, value2) => {
    if (value1 != null) {
      this.props.AddCheckin(value1);
    }
    if (value2 != null) {
      this.props.AddCheckout(value2);
    }
  };
  renderinvoicefinal = () => {
    return (
      <View style={{ flexDirection: "row", margin: 10, marginBottom: 20 }}>
        <View style={styles.invoiceprice}>
          <Text style={styles.invoicetotal}>Total</Text>
        </View>
        <View style={styles.checkoutedit} />
        <View style={styles.invoicevalue}>
          <Text style={styles.invoicetotal}>
            ${(Total = perNightTotalfee + Servicefee)}
          </Text>
        </View>
      </View>
    );
  };
  setRefundAmount = value => {
    this.setState({ RefundValue: value });
  };
  resetPage() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate(
          {
            routeName: "Home"
          },
          { pageIndex: "trips" }
        )
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    hotelDetails = this.props.AllData.HotelData;
    checkin = this.props.AllData.CheckIn;
    checkout = this.props.AllData.CheckOut;
    userdetails = this.props.AllData.UserData;
    guest = this.props.AllData.GuestCount;
    return (
      <View style={styles.mainviewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]} />
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
          <View style={styles.productRow}>{this.rendercheckinDetail()}</View>
          <View style={styles.productRow}>{this.rendercheckoutDetail()}</View>
          <View style={styles.productRow}>{this.renderhrfirsttag()}</View>
          <View style={styles.productRow}>{this.rendercheckDetail()}</View>
          <View style={styles.productRow}>{this.renderhrlasttag()}</View>
          <View style={styles.productRow}>{this.renderinvoice()}</View>
          <View style={styles.productRow}>{this.renderinvoiceprice()}</View>
          <View style={styles.productRow}>{this.renderhrlasttag()}</View>
          <View style={styles.productRow}>{this.renderinvoicefinal()}</View>
        </ScrollView>
        {this.GetFooterButton()}
        <CommonDatePickerModal
          setDateModalVisible={this.setdateModalVisible}
          modalstart={this.state.modalstart}
          saveDate={this.saveDate}
        />
        <CommonGuest
          setGuestModalVisible={this.setGuestModalVisible}
          modalGuestStart={this.state.modalGuestStart}
        />
        <ManageBookingPopup
          setmanagebookModalVisible={this.setmanagebookModalVisible}
          bookingData={bookingData}
          modalmanagebooking={this.state.modalmanagebooking}
          setcancelModalVisible={this.setcancelModalVisible}
          BookingmodifyClose={this.BookingmodifyClose}
        />
        <CancellationPopup
          setmanagebookModalVisible={this.setmanagebookModalVisible}
          bookingData={bookingData}
          modalcancelbooking={this.state.modalcancelbooking}
          setcancelModalVisible={this.setcancelModalVisible}
          SpinnerStart={this.SpinnerStart}
          setRefundAmount={this.setRefundAmount}
          setSuccesscancelModalVisible={this.setSuccesscancelModalVisible}
          BookingmodifyClose={this.BookingmodifyClose}
        />

        <CancellSuccess
          modalCancellSuccess={this.state.modalCancellSuccess}
          bookingData={bookingData}
          resetPage={this.resetPage}
          RefundValue={this.state.RefundValue}
        />
        {this.renderSpinner()}
      </View>
    );
  }
}

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(PreviewBookingDetails);
