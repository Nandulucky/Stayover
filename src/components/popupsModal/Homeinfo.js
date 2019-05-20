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
import Modal from "react-native-modal";

import PropTypes from "prop-types";
import { CheckBox } from "react-native-elements";
import * as actions from "../../actions";

import NumericInput from "react-native-numeric-input";
import Icon from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";

class Homeinfo extends Component {
  state = {
    modalVisible: false
  };
  setModalVisible(visible) {
    this.props.setHomeDataModalVisible(visible);
  }

  onDateChange = () => {};
  render() {
    const { imageStyle, container } = styles;
    const { checked } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalhomeinfo}
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
            marginLeft: "10%",
            marginRight: "10%"
          }}
        >
          <Icon name="close" size={25} color="black" />
        </TouchableHighlight>
        <View style={container}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }} />
          <Text
            style={{
              color: "#3d3d3d",
              fontFamily: "OpenSans-Regular",
              fontSize: 21
            }}
          >
            Cancellation policy
          </Text>
          <Text
            style={{
              color: "#3d3d3d",
              paddingTop: 5,
              fontFamily: "OpenSans-Regular",
              fontSize: 15,
              lineHeight: 25
            }}
          >
            Cancel within 48 hours of booking and at least 5 days befor checkin
            and the entire reservation is refundable. After that, cancel up to 5
            days before checki-in and the nights are refundable, but the service
            fee isn't/ Cancel within 5 days of checki-in and the service fee,
            first night, and half of the following nights are non-refundable.
          </Text>
          <Text
            style={{
              color: "#3d3d3d",
              paddingTop: 15,
              fontFamily: "OpenSans-Regular",
              fontSize: 21
            }}
          >
            House rules
          </Text>
          <Text
            style={{
              color: "#3d3d3d",
              paddingTop: 5,
              fontFamily: "OpenSans-Regular",
              fontSize: 15,
              lineHeight: 25
            }}
          >
            General rules{"\n"}• No smoking {"\n"}• No pets {"\n"}• No parties
            or events {"\n"}• Check-in time is 3PM - 2AM(next day)
          </Text>
        </View>
      </Modal>
    );
  }
}

Homeinfo.propTypes = {
  setHomeDataModalVisible: PropTypes.func
  //saveDate: PropTypes.func
};

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(Homeinfo);

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,
    marginLeft: "10%",
    marginRight: "10%"
  },

  buttonFooter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  borderCenter: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#FFA890"
  },
  textFooter: {
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18,
    fontFamily: "OpenSans-Regular"
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    justifyContent: "center",

    bottom: 0,
    backgroundColor: "#432355",
    flexDirection: "row",
    height: 65,
    alignItems: "center"
  },
  gestinputstyle: {
    fontSize: 14,
    textAlign: "justify",
    borderWidth: 1,
    borderRadius: 19,
    paddingLeft: 25,
    borderColor: "#DFDFDF",
    color: "#3d3d3d",
    textTransform: "capitalize",
    fontFamily: "OpenSans-Regular"
  },
  buttonstyle: {
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 2,
    borderRadius: 25
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  cancelselectedColor: {
    margin: 10,
    fontSize: 16,
    textAlign: "right",
    fontFamily: "OpenSans-Regular"
  }
  // NumericInputbutton: {
  //   borderColor: "#fff",
  //   borderRadius: 25
  // }
});
