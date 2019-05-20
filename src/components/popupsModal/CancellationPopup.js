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
              3 nights Apr10 - Apr-13 will be cancelled.
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Cancel Booking"
              color="#841584"
              onPress={() => {}}
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
  BookingmodifyClose: PropTypes.func
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
