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

class ManageBookingPopup extends Component {
  state = {
    modalVisible: false,
    modalhomeinfo: false
  };

  setHomeModalVisible = visible => {
    this.setState({ modalhomeinfo: visible });
  };
  setModalVisible(visible) {
    this.props.setmanagebookModalVisible(visible);
  }
  constructor(props) {
    super(props);
    hotelDetails = this.props.AllData.HotelData;
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
              for 3 nights Apr 10 - Apr-13
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
