import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import SuccesBookModal from "../popupsModal/SuccesBookModal";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
Amplify.configure(awsConfig);
import { PaymentRequest } from "react-native-payments";
import { connect } from "react-redux";
import * as actions from "../../actions";
//import stripe from "tipsi-stripe";
import ModificationSuccess from "../popupsModal/ModificationSuccess";

import ProductStyles from "../Details/ProductStyle";
import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input";
import { StackActions, NavigationActions } from "react-navigation";
import { Spinner } from "../common";
// stripe.setOptions({
//   publishableKey: "sk_test_ZwE0e6yVDfxqSyrFzdKYFSuD00qltN538t",
//   merchantId: "MERCHANT_ID", // Optional
//   androidPayMode: "test" // Android only
// });
const styles = StyleSheet.create({ ...ProductStyles });

let hotelDetails = null;
let checkin = null;
let checkout = null;
let userdetails = null;
let guest;
let Total;
let bookingData = null;
let modifyBooking = null;

let paymentDetailsStripe;
let bookingdatawithoutconfirm;
class Checkout extends Component {
  state = {
    isLoading: false,
    currIndex: 0,
    headColor: "#432355",
    modalstart: false,
    paymentMethod: null,
    cardtoken: null,
    modifyBooking: false,
    modalModificationSuccess: false
  };
  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }
  constructor(props) {
    super(props);
    this.MakePayment = this.MakePayment.bind(this);
    this.SaveBooking = this.SaveBooking.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);

    this.checkEnabledPayments = this.checkEnabledPayments.bind(this);
    this.MakePaymentCharged = this.MakePaymentCharged.bind(this);

    bookingData = this.props.navigation.getParam("bookingData", false);
    modifyBooking = this.props.navigation.getParam("modifyBooking", false);

    hotelDetails = this.props.AllData.HotelData;
    checkin = this.props.AllData.CheckIn;
    checkout = this.props.AllData.CheckOut;
    userdetails = this.props.AllData.UserData;
    guest = this.props.AllData.GuestCount;
    this.resetPage = this.resetPage.bind(this);

    this.modifyConfirmDate = this.modifyConfirmDate.bind(this);
    this.SpinnerStart = this.SpinnerStart.bind(this);
    Total = this.props.navigation.getParam("Final_Total", null);
  }

  _onChange(form) {
    // console.log(form);
    this.setState({
      cardIsValid: form.valid
    });
    if (form.valid) {
      this.setState({
        cardNumber: form.values.number,
        expiry: form.values.expiry,
        cvc: form.values.cvc,
        cardType: form.values.type
      });
    }
  }

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
  SpinnerStart(value) {
    this.setState({ isLoading: value });
  }

  async modifyConfirmDate() {
    let newBookingData = Object.create(bookingData);

    newBookingData.Booking_From_Date = this.props.AllData.CheckIn;
    newBookingData.Booking_To_Date = this.props.AllData.CheckOut;
    newBookingData.Total_Guests = this.props.AllData.GuestCount;
    if (paymentDetailsStripe != null) {
      newBookingData.Booking_Payment_Details = paymentDetailsStripe;
    }
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

        this.setSuccessModificationSuccess(true);
        this.SpinnerStart(false);
      })
      .catch(error => {
        console.log(error.response);

        this.SpinnerStart(false);
      });
  }

  async MakePaymentCharged() {
    const response = await axios
      .post(
        "https://api.stripe.com/v1/charges?amount=" +
          Total +
          "&currency=usd&source=" +
          this.state.cardtoken +
          "&description=" +
          userdetails.name +
          " booking for " +
          hotelDetails.Apartment_Name,

        null,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer " + "sk_test_ZwE0e6yVDfxqSyrFzdKYFSuD00qltN538t"
          }
        }
      )
      .then(response => {
        // handle success
        if (response.status == "200") {
          console.log(response);
          paymentDetailsStripe = response.data;
          if (modifyBooking) {
            this.modifyConfirmDate();
          } else {
            this.confirmBooking(true);
          }
          return true;
        }
      })
      .catch(error => {
        console.log(error.response);
        paymentDetailsStripe = error.response.data;
        if (modifyBooking) {
          this.modifyConfirmDate();
        } else {
          this.confirmBooking(false);
        }
        alert(
          "Failed Payment, Check your details again?",
          error.response.data.error.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );

        this.SpinnerStart(false);
        return;
      });
  }

  async MakePayment() {
    if (modifyBooking) {
      Total = this.props.navigation.getParam("extraPayment", false);
    }
    const response = await axios
      .post(
        "https://api.stripe.com/v1/tokens?card[number]=" +
          this.state.cardNumber.replace(/\s+/g, "") +
          "&card[exp_month]=" +
          this.state.expiry.substring(0, 2) +
          "&card[exp_year]=" +
          this.state.expiry.substring(this.state.expiry.length - 2) +
          "&card[cvc]=" +
          this.state.cvc +
          "&amount=" +
          Total +
          "&currency=usd",
        null,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer " + "sk_test_ZwE0e6yVDfxqSyrFzdKYFSuD00qltN538t"
          }
        }
      )
      .then(response => {
        // handle success
        if (response.status == "200") {
          console.log(response);
          this.setState({ cardtoken: response.data.id });
          this.MakePaymentCharged();

          return true;
        }
      })
      .catch(error => {
        console.log(error.response);
        paymentDetailsStripe = error.response.data;
        if (!modifyBooking) {
          this.confirmBooking(false);
        }

        alert(
          "Failed Payment",
          error.response.data.error.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );

        this.SpinnerStart(false);
        return;
      });
    this.props.CurrentPage("Trips");

    return;
  }

  async confirmBooking(paymentstatus) {
    const response = await axios
      .post(
        "https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/booking/confirm",
        {
          bookingDetails: {
            bookingId: bookingdatawithoutconfirm.items[0].bookingId,
            bookingStatus: paymentstatus
              ? "BOOKED_AND_BILLING_SUCCESS"
              : "BOOKED_AND_BILLING_FAILED",
            checkInDate: new Date(
              bookingdatawithoutconfirm.items[0].checkInDate
            ),
            checkOutDate: new Date(
              bookingdatawithoutconfirm.items[0].checkOutDate
            ),
            paymentDetails: paymentDetailsStripe,
            unitId: bookingdatawithoutconfirm.items[0].unitId
          },
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
        this.setState({
          modifyBooking: this.props.navigation.getParam("modifyBooking", false)
        });
        console.log(response);
        if (response.data.statusCode == true) {
          this.setState({ modalstart: true });
        } else {
          alert(response.data.msg);
        }
        this.SpinnerStart(false);
      })
      .catch(error => {
        console.log(error.response);
        alert("Error in saving data! Try again.");
        this.setState({ modalstart: false });
        this.SpinnerStart(false);
      });
  }
  async checkEnabledPayments() {
    const METHOD_DATA = [
      {
        supportedMethods: ["android-pay"],

        data: {
          supportedNetworks: ["visa", "mastercard", "amex"],
          countryCode: "US",
          currencyCode: "USD",
          environment: "TEST",

          paymentMethodTokenizationParameters: {
            tokenizationType: "GATEWAY_TOKEN",

            parameters: {
              gateway: "stripe",
              "stripe:publishableKey":
                "sk_test_ZwE0e6yVDfxqSyrFzdKYFSuD00qltN538t",
              "stripe:version": "2018-11-08" // Only required on Android
            }
          }
        }
      }
    ];

    const DETAILS = {
      id: "2342432",

      total: {
        label: "Merchant Name",
        amount: { currency: "USD", value: "15.00" }
      }
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    var googlePayenabled = await paymentRequest.canMakePayments();

    var dat = await paymentRequest
      .show()
      .then(paymentResponse => {
        try {
          const { paymentToken } = paymentResponse.details; // On Android, you need to invoke the `getPaymentToken` method to receive the `paymentToken`.
        } catch {}
      })
      .catch(errorHandler => {
        console.log(errorHandler);
      });
  }

  renderCreditCard = () => {
    if (this.state.paymentMethod == "card") {
      return <CreditCardInput onChange={this._onChange.bind(this)} />;
    } else {
      return <View />;
    }
  };

  async SaveBooking() {
    Auth.currentSession()
      .then(data => {
        (userdetails.accessToken = data.accessToken.jwtToken),
          (userdetails.idtoken = data.idToken.jwtToken);
        // handle success
        this.setState({
          modifyBooking: this.props.navigation.getParam("modifyBooking", false)
        });

        this.MakePayment();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View
        style={styles.mainviewStyle}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
      >
        {this.renderCreditCard()}
        {this.state.paymentMethod == "card" ? (
          <View />
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flexDirection: "column",
                marginLeft: "8%",
                marginRight: "1%",
                marginTop: 20,
                fontSize: 16
              }}
            >
              Select Payment method for
            </Text>
            <Text
              style={{
                flexDirection: "column",
                marginTop: 20,
                fontSize: 16,
                color: "#432355",
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              ${Total}
            </Text>
          </View>
        )}
        {this.state.paymentMethod == "card" ? (
          <View />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({ paymentMethod: "card" });
            }}
          >
            <View
              style={{
                marginLeft: "8%",
                marginRight: "8%",
                marginTop: "2%",
                marginBottom: "0%",
                borderColor: "#DFDFDF",
                borderWidth: 1,
                padding: 15,
                borderRadius: 2,
                flexDirection: "row"
              }}
            >
              <Image
                source={require("../../assets/visa-icon.png")}
                style={{ height: 30, width: 80, marginTop: 5 }}
              />
              <Text
                style={{
                  marginLeft: 20,
                  color: "#432355",
                  marginTop: 10,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Pay with card
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.state.paymentMethod == "card" ? (
          <View />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({ paymentMethod: "gpay" });

              this.checkEnabledPayments();
            }}
          >
            <View
              style={{
                marginLeft: "8%",
                marginRight: "8%",
                marginTop: "5%",
                marginBottom: "0%",
                borderColor: "#DFDFDF",
                borderWidth: 1,
                padding: 15,
                borderRadius: 2,
                flexDirection: "row"
              }}
            >
              <Image
                source={require("../../assets/Google_Pay.png")}
                style={{ height: 30, width: 80, marginTop: 5 }}
              />
              <Text
                style={{
                  marginLeft: 20,
                  color: "#432355",
                  marginTop: 8,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Google Pay
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.state.paymentMethod == "card" ? (
          <View />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({ paymentMethod: "apay" });

              this.checkEnabledPayments();
            }}
          >
            <View
              style={{
                marginLeft: "8%",
                marginRight: "8%",
                marginTop: "5%",
                marginBottom: "0%",
                borderColor: "#DFDFDF",
                borderWidth: 1,
                padding: 15,
                borderRadius: 2,
                flexDirection: "row"
              }}
            >
              <Image
                source={require("../../assets/apple_pay.png")}
                style={{ height: 30, width: 80, marginTop: 5 }}
              />
              <Text
                style={{
                  marginLeft: 20,
                  color: "#432355",
                  marginTop: 8,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Apple Pay
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <Image
          style={{
            resizeMode: "contain",
            alignItems: "center",
            marginLeft: "20%",
            marginRight: "20%",
            justifyContent: "flex-end",
            marginTop: "30%",
            width: "60%"
          }}
          source={require("../../assets/securePayment.png")}
        />
        {this.state.paymentMethod == "card" ? (
          <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              this.SpinnerStart(true);

              if (this.state.cardIsValid) {
                this.SaveBooking();
              } else {
                this.SpinnerStart(false);

                alert("Invalid card details! Please Recheck.");
                return;
              }
            }}
          >
            <Text style={styles.textFooter}>Proceed To pay ${Total}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <SuccesBookModal
          resetPage={this.resetPage}
          modalstart={this.state.modalstart}
          modifyBooking={modifyBooking}
          checkInDate={new Date(checkin)}
          checkOutDate={new Date(checkout)}
        />
        <ModificationSuccess
          modalModificationSuccess={this.state.modalModificationSuccess}
          bookingData={bookingData}
          resetPage={this.resetPage}
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
)(Checkout);
