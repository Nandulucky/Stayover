import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  Dimensions,
  View,
  Text
} from "react-native";
import { Button } from "react-native-elements";

import Modal from "react-native-modal";

import PropTypes from "prop-types";
import { CheckBox } from "react-native-elements";
import * as actions from "../../actions";

import NumericInput from "react-native-numeric-input";
import Icon from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";
import Homeinfo from "../popupsModal/Homeinfo";

let userdetails = null;
let hotelDetails = null;
let refundData = null;
let dt1 = null;
let dt2 = null;

class CancellationPopup extends Component {
  state = {
    modalVisible: false,
    modalhomeinfo: false
  };
  setModalVisible(visible) {
    this.props.setcancelModalVisible(visible);
  }
  setHomeModalVisible = visible => {
    this.setState({ modalhomeinfo: visible });
  };

  constructor(props) {
    super(props);
    this.CancelBooking = this.CancelBooking.bind(this);
    (userdetails = this.props.AllData.UserData),
      (hotelDetails = this.props.AllData.HotelData);

    dt1 = new Date(this.props.bookingData.Booking_From_Date);
    dt2 = new Date(this.props.bookingData.Booking_To_Date);
  }

  formatDate(date) {
    if (date == "") {
      return;
    }
    var newd = new Date(date);
    var day = newd.getDay();
    var monthIndex = newd.getMonth();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

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
    return month[monthIndex] + " " + newd.getDate();
  }

  async DoRefund() {
    var charge = this.props.bookingData.Booking_Payment_Details.id;
    if (refundData.data.refundAmount == "NIL") {
      this.CancelBooking();
      return;
    }
    var Amount = this.props.bookingData.Booking_Payment_Details.amount;
    const response = await axios
      .post(
        "https://api.stripe.com/v1/refunds?charge=" +
          charge +
          "&amount=" +
          Amount +
          "&reason=requested_by_customer",

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
          this.CancelBooking();
        }
      })
      .catch(error => {
        console.log(error.response);

        alert(
          "Refund failed!",
          error.response.data.error.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );

        this.props.SpinnerStart(false);
        return;
      });
  }
  async componentWillMount() {
    const res = await axios

      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/booking/cancel`,
        {
          userDetails: {
            userId: userdetails.userID,
            userName: userdetails.name,
            userEmail: userdetails.email,
            userContact: userdetails.phone_number
          },

          unitId: hotelDetails.Apartment_Unit_Id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userdetails.idtoken
            // Token: userdetails.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(({ data }) => {
        refundData = data;
        if (data.data.refundAmount == "FULL") {
          tis.setState({
            amountTorefund: this.props.bookingData.Booking_Payment_Details
              .amount
          });
          this.props.setRefundAmount(
            this.props.bookingData.Booking_Payment_Details.amount
          );
        } else {
          tis.setState({ amountTorefund: 0 });

          this.props.setRefundAmount(0);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  async CancelBooking() {
    this.props.SpinnerStart(true);
    this.setModalVisible(false);

    const res = await axios

      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/booking/cancel/confirm`,
        {
          userDetails: {
            userId: userdetails.userID,
            userName: userdetails.name,
            userEmail: userdetails.email,
            userContact: userdetails.phone_number
          },

          refundStatus: refundData.data.refundAmount,
          cancelBookingInfo: {
            bookingId: this.props.bookingData.Booking_Id,
            bookingStatus: "CANCELLED",
            checkInDate: this.props.bookingData.Booking_From_Date,
            checkOutDate: this.props.bookingData.Booking_To_Date,
            unitId: hotelDetails.Apartment_Unit_Id,
            cencelPaymentDetails: null
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userdetails.idtoken
            // Token: userdetails.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(({ data }) => {
        this.props.SpinnerStart(false);

        if (data.statusCode) {
          this.props.setSuccesscancelModalVisible(true);
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        this.setModalVisible(false);

        this.setState({ error: true });
        this.props.SpinnerStart(false);
        alert(error.response);
      });
  }
  onDateChange = () => {};
  render() {
    const { imageStyle, container } = styles;
    const { checked } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalcancelbooking}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
        style={{
          backgroundColor: "#232f3e78"
        }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(false);
          }}
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            backgroundColor: "white",
            paddingTop: 10,
            paddingRight: 15,
            marginLeft: "3%",
            marginRight: "3%"
          }}
        >
          <Icon name="close" size={25} color="black" />
        </TouchableHighlight>
        <View style={container}>
          <Text
            style={{
              color: "#432355",
              fontFamily: "OpenSans-SemiBold",
              textAlign: "center",
              fontSize: 17
            }}
          >
            Are you sure to Cancel your booking?
          </Text>
          <View
            style={{
              borderBottomColor: "#ededed",
              paddingVertical: 5,
              borderBottomWidth: 1
            }}
          />
          <View style={{ width: "100%" }}>
            <Text
              style={{
                color: "#3d3d3d",
                paddingTop: 5,
                fontFamily: "OpenSans-Regular",
                fontSize: 15,
                lineHeight: 25,
                textAlign: "center"
              }}
            >
              Booking done for
            </Text>
            <Text
              style={{
                color: "#3d3d3d",
                paddingTop: 5,
                fontFamily: "OpenSans-Regular",
                fontSize: 15,
                lineHeight: 25,
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              &nbsp;{this.props.AllData.HotelData.Apartment_Name}
            </Text>
            <Text
              style={{
                color: "#3d3d3d",
                paddingTop: 5,
                fontFamily: "OpenSans-Regular",
                fontSize: 15,
                lineHeight: 25,
                textAlign: "center"
              }}
            >
              {Math.floor(
                (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                  Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              nights {this.formatDate(this.props.bookingData.Booking_From_Date)}
              {" - "}
              {this.formatDate(this.props.bookingData.Booking_To_Date)} will be
              cancelled. The Refund amount is {this.state.amountTorefund}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Confirm Cancellation"
              color="#841584"
              onPress={() => {
                this.DoRefund();
              }}
              buttonStyle={{ ...styles.bigbutton, backgroundColor: "#432355" }}
              titleStyle={{
                color: "white",
                fontSize: 18,
                fontFamily: "OpenSans-SemiBold"
              }}
            />
          </View>
          <TouchableHighlight>
            <Text
              style={{
                marginTop: "15%",
                color: "#432355",
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                lineHeight: 25,
                textAlign: "center",
                textDecorationLine: "underline"
              }}
              onPress={() => {
                this.setState({ modalhomeinfo: true });
              }}
            >
              View Cancellation Policy
            </Text>
          </TouchableHighlight>
          <Homeinfo
            setHomeDataModalVisible={this.setHomeModalVisible}
            modalhomeinfo={this.state.modalhomeinfo}
          />
        </View>
      </Modal>
    );
  }
}

CancellationPopup.propTypes = {
  setcancelModalVisible: PropTypes.func,
  SpinnerStart: PropTypes.func,
  setRefundAmount: PropTypes.func
};

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(CancellationPopup);

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    marginLeft: "3%",
    marginRight: "3%"
  },
  bigbutton: {
    borderRadius: 19,
    marginHorizontal: "15%",
    height: 55,
    backgroundColor: "#fff200"
  }
});
