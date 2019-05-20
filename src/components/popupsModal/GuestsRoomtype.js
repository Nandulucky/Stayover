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
import NumericInput from "react-native-numeric-input";
import Icon from "react-native-vector-icons/EvilIcons";

export default class GuestsRoomtype extends Component {
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
    this.setState({ modalVisible: visible });
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
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={container}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
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
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <Text
                style={{
                  color: "#432355",
                  marginTop: 8,
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
                  paddingTop: 10
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                    fontSize: 18,
                    color: "#3d3d3d"
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
                    <Icon name="minus" size={33} color="#a5a5a5" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 10,
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
                    <Icon name="plus" size={33} color="black" />
                  </TouchableOpacity>
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
                      fontSize: 18,
                      color: "#3d3d3d"
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
                      <Icon name="minus" size={33} color="#a5a5a5" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginVertical: 10,
                        marginHorizontal: 10,
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
                      <Icon name="plus" size={33} color="black" />
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
                      fontSize: 18,
                      color: "#3d3d3d"
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
                      <Icon name="minus" size={33} color="#a5a5a5" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginVertical: 10,
                        marginHorizontal: 10,
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
                      <Icon name="plus" size={33} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  color: "#432355",
                  marginTop: 25,
                  fontSize: 19,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Room Type
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  paddingTop: 10
                }}
                onPress={() =>
                  this.setState({
                    roomTypeSelected: "Studio",
                    StudioChecked: !this.state.StudioChecked,
                    oneBRchecked: false,
                    twoBRchecked: false,
                    HouseChecked: false
                  })
                }
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 18,

                      color: "#3d3d3d"
                    }}
                  >
                    Studio
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12,
                      width: "100%"
                    }}
                  >
                    Room with attached bathroom and a Kitchenette.
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#432355"
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginTop: 15
                    }}
                    onPress={() =>
                      this.setState({
                        roomTypeSelected: "Studio",
                        StudioChecked: !this.state.StudioChecked,
                        oneBRchecked: false,
                        twoBRchecked: false,
                        HouseChecked: false
                      })
                    }
                    checked={this.state.StudioChecked}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  paddingTop: 10
                }}
                onPress={() =>
                  this.setState({
                    roomTypeSelected: "1BR",
                    oneBRchecked: !this.state.oneBRchecked,
                    twoBRchecked: false,
                    HouseChecked: false,
                    StudioChecked: false
                  })
                }
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 18,

                      color: "#3d3d3d"
                    }}
                  >
                    1BR
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12
                    }}
                  >
                    Apartment with 1 bedroom
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#432355"
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginTop: 15
                    }}
                    onPress={() =>
                      this.setState({
                        roomTypeSelected: "1BR",
                        oneBRchecked: !this.state.oneBRchecked,
                        twoBRchecked: false,
                        HouseChecked: false,
                        StudioChecked: false
                      })
                    }
                    checked={this.state.oneBRchecked}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  paddingTop: 10
                }}
                onPress={() =>
                  this.setState({
                    roomTypeSelected: "2BR",
                    twoBRchecked: !this.state.twoBRchecked,
                    oneBRchecked: false,
                    HouseChecked: false,
                    StudioChecked: false
                  })
                }
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#3d3d3d"
                    }}
                  >
                    2BR
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12
                    }}
                  >
                    Apartment with 2 bedroom
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#432355"
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginTop: 15
                    }}
                    onPress={() =>
                      this.setState({
                        roomTypeSelected: "2BR",
                        twoBRchecked: !this.state.twoBRchecked,
                        oneBRchecked: false,
                        HouseChecked: false,
                        StudioChecked: false
                      })
                    }
                    checked={this.state.twoBRchecked}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  paddingTop: 10
                }}
                onPress={() =>
                  this.setState({
                    roomTypeSelected: "House",
                    HouseChecked: !this.state.HouseChecked,
                    oneBRchecked: false,
                    twoBRchecked: false,
                    StudioChecked: false
                  })
                }
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#3d3d3d"
                    }}
                  >
                    House
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: 12
                    }}
                  >
                    Entire Place
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#432355"
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginTop: 10
                    }}
                    onPress={() =>
                      this.setState({
                        roomTypeSelected: "House",
                        HouseChecked: !this.state.HouseChecked,
                        oneBRchecked: false,
                        twoBRchecked: false,
                        StudioChecked: false
                      })
                    }
                    checked={this.state.HouseChecked}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                this.props.saveGuests(this.state.totalGuestCount);
                this.props.saveRoomType(this.state.roomTypeSelected);
                this.setModalVisible(false);
              }}
            >
              <Text style={styles.textFooter}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5
            }}
          >
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 5 }}>
              <TextInput
                style={styles.gestinputstyle}
                editable={false}
                placeholder="Guests"
                placeholderTextColor="#808080"
                value={this.state.totalGuestCount + " Guests"}
              />
            </View>
            <View style={{ flex: 1, paddingRight: 10, paddingLeft: 5 }}>
              <TextInput
                style={styles.gestinputstyle}
                editable={false}
                placeholder="Room types"
                placeholderTextColor="#808080"
                value={this.state.roomTypeSelected}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

GuestsRoomtype.propTypes = {
  saveGuests: PropTypes.func,
  saveRoomType: PropTypes.func
};

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
    paddingLeft: 18,
    borderColor: "#DFDFDF",
    backgroundColor: "white",

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
