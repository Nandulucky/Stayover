import React, { Component } from "react";
import {
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text
} from "react-native";
import PropTypes from "prop-types";
import { CheckBox } from "react-native-elements";
import * as actions from "../../../actions";

import NumericInput from "react-native-numeric-input";
import Icon from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";

class CommonGuest extends Component {
  state = {
    modalVisible: false,
    StudioChecked: false,
    oneBRchecked: false,
    twoBRchecked: false,
    HouseChecked: false,
    totalGuestCount: 1,
    AdultCount: 1,
    ChildrenCount: 0,
    InfantCount: 0,
    roomTypeSelected: ""
  };
  setModalVisible(visible) {
    this.props.setGuestModalVisible(visible);
  }

  onDateChange = () => {};
  render() {
    const { imageStyle, container } = styles;
    const { checked } = this.state;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalGuestStart}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={container}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Icon
                  name="close"
                  size={25}
                  color="black"
                  style={styles.selectedColor}
                />
                {/* <Text style={styles.cancelselectedColor}>Clear</Text> */}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <Text
                style={{
                  color: "#432355",
                  marginTop: 25,
                  fontSize: 19,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Guests
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 23,
                  paddingVertical: 33,
                  paddingTop: 10
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                    fontSize: 18
                  }}
                >
                  Adults
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      if (this.state.AdultCount <= 1) {
                        this.setState({
                          AdultCount: 1
                        });
                        return;
                      }
                      this.setState({
                        AdultCount: this.state.AdultCount - 1,
                        totalGuestCount: this.state.totalGuestCount - 1
                      });
                    }}
                  >
                    <Icon name="minus" size={28} color="black" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginVertical: 5,
                      marginHorizontal: 5,
                      fontWeight: "400",
                      fontSize: 20
                    }}
                  >
                    {this.state.AdultCount}
                  </Text>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      this.setState({
                        AdultCount: this.state.AdultCount + 1,
                        totalGuestCount: this.state.totalGuestCount + 1
                      });
                    }}
                  >
                    <Icon name="plus" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 23,
                  paddingVertical: 33,

                  paddingTop: 10
                }}
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 18
                    }}
                  >
                    Children
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12
                    }}
                  >
                    Ages 2-12
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ justifyContent: "center" }}
                      onPress={() => {
                        if (this.state.ChildrenCount < 1) {
                          this.setState({
                            ChildrenCount: 0
                          });
                          return;
                        }
                        this.setState({
                          ChildrenCount: this.state.ChildrenCount - 1,
                          totalGuestCount: this.state.totalGuestCount - 1
                        });
                      }}
                    >
                      <Icon name="minus" size={28} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginVertical: 5,
                        marginHorizontal: 5,
                        fontWeight: "400",
                        fontSize: 20
                      }}
                    >
                      {this.state.ChildrenCount}
                    </Text>
                    <TouchableOpacity
                      style={{ justifyContent: "center" }}
                      onPress={() => {
                        this.setState({
                          ChildrenCount: this.state.ChildrenCount + 1,
                          totalGuestCount: this.state.totalGuestCount + 1
                        });
                      }}
                    >
                      <Icon name="plus" size={28} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 23,
                  paddingTop: 10
                }}
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 18
                    }}
                  >
                    Infants
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12
                    }}
                  >
                    Under 2
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ justifyContent: "center" }}
                      onPress={() => {
                        if (this.state.InfantCount < 1) {
                          this.setState({
                            InfantCount: 0
                          });
                          return;
                        }
                        this.setState({
                          InfantCount: this.state.InfantCount - 1,
                          totalGuestCount: this.state.totalGuestCount - 1
                        });
                      }}
                    >
                      <Icon name="minus" size={28} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginVertical: 5,
                        marginHorizontal: 5,
                        fontWeight: "400",
                        fontSize: 20
                      }}
                    >
                      {this.state.InfantCount}
                    </Text>
                    <TouchableOpacity
                      style={{ justifyContent: "center" }}
                      onPress={() => {
                        this.setState({
                          InfantCount: this.state.InfantCount + 1,
                          totalGuestCount: this.state.totalGuestCount + 1
                        });
                      }}
                    >
                      <Icon name="plus" size={28} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                this.props.AddGuestCount(this.state.totalGuestCount);
                this.setModalVisible(false);
              }}
            >
              <Text style={styles.textFooter}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

CommonGuest.propTypes = {
  setGuestModalVisible: PropTypes.func,
  saveDate: PropTypes.func
};

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(CommonGuest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
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
  selectedColor: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
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
