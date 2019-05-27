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
import Homeinfo from "../popupsModal/Homeinfo";

import Icon from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";

let hotelDetails;
let dt1 = null;
let dt2 = null;
class ManageBookingPopup extends Component {
  state = {
    modalVisible: false,
    modalhomeinfo: false
  };

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

  setHomeModalVisible = visible => {
    this.setState({ modalhomeinfo: visible });
  };
  setModalVisible(visible) {
    this.props.setmanagebookModalVisible(visible);
  }
  constructor(props) {
    super(props);
    hotelDetails = this.props.AllData.HotelData;
    dt1 = new Date(this.props.bookingData.Booking_From_Date);
    dt2 = new Date(this.props.bookingData.Booking_To_Date);
  }
  onDateChange = () => {};
  render() {
    const { imageStyle, container } = styles;
    const { checked } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalmanagebooking}
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
          <View>
            <Text
              style={{
                color: "#432355",
                fontFamily: "OpenSans-SemiBold",
                textAlign: "center",
                fontSize: 17
              }}
            >
              Are you sure to Modify your booking mentioned below?
            </Text>
            <Text style={{ borderColor: "#ededed", borderBottomWidth: 1 }} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#3d3d3d",
                fontFamily: "OpenSans-SemiBold",
                fontSize: 15,
                textAlign: "center"
              }}
            >
              {hotelDetails.Apartment_Name}
            </Text>
            <Text
              style={{
                color: "#3d3d3d",
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                textAlign: "center"
              }}
            >
              for{" "}
              {Math.floor(
                (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                  Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              nights {this.formatDate(this.props.bookingData.Booking_From_Date)}
              {" - "}
              {this.formatDate(this.props.bookingData.Booking_To_Date)}
            </Text>
            <Button
              title="Change Travel Dates"
              color="#841584"
              onPress={() => {
                this.props.BookingmodifyClose();
              }}
              buttonStyle={{ ...styles.bigbutton, marginTop: 15 }}
              titleStyle={{
                color: "#432355",
                fontSize: 17,
                fontFamily: "OpenSans-SemiBold"
              }}
            />
            <Text
              style={{
                color: "#3d3d3d",
                fontFamily: "OpenSans-Regular",
                fontSize: 15,
                padding: "5%",
                textAlign: "center"
              }}
            >
              OR
            </Text>
            <Button
              title="Cancel Booking"
              color="#841584"
              onPress={() => {
                this.props.setmanagebookModalVisible(false);

                this.props.setcancelModalVisible(true);
              }}
              buttonStyle={{ ...styles.bigbutton, backgroundColor: "#432355" }}
              titleStyle={{
                color: "white",
                fontSize: 17,
                fontFamily: "OpenSans-SemiBold"
              }}
            />
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
        </View>
      </Modal>
    );
  }
}

ManageBookingPopup.propTypes = {
  setmanagebookModalVisible: PropTypes.func,
  BookingmodifyClose: PropTypes.func,
  setcancelModalVisible: PropTypes.func
};

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(ManageBookingPopup);

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
