import React, { Component } from "react";
import {
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Dimensions,
  Text
} from "react-native";
import ProductStyles from "../Details/ProductStyle";
import { connect } from "react-redux";

import * as actions from "../../actions";
import { Button, SearchBar, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { StackActions, NavigationActions } from "react-navigation";

import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { FlatGrid } from "react-native-super-grid";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const icon = require("../../assets/exit.png");

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;
let hotelDetails;

class SuccessBookModel extends Component {
  state = {
    modalVisible: false
  };
  constructor(props) {
    super(props);
    hotelDetails = this.props.AllData.HotelData;
  }
  setModalVisible(visible) {
    this.props.modalstart = false;
  }

  Aminity(dat) {}
  onDateChange = () => {};
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  ResetPage() {
    this.props.CurrentPage("Trips");

    this.setModalVisible(false);
    this.props.resetPage();
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalstart}
          // onRequestClose={() => {
          //   this.setModalVisible(!this.state.modalVisible);
          // }}
        >
          <View style={styles.container}>
            <Image
              source={require("../../assets/bookingsuccessfull.png")}
              style={styles.imageHead}
            />
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                marginTop: 0,
                fontSize: 35,
                color: "#432355",
                position: "absolute",
                top: "34%"
              }}
            >
              {!this.props.modifyBooking
                ? " Success !"
                : "Modification Success!"}
            </Text>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={styles.textFooter}>Your Booking for</Text>
              <Text
                style={{
                  ...styles.textFooter,
                  fontFamily: "OpenSans-SemiBold",
                  fontWeight: "700"
                }}
              >
                {hotelDetails.Apartment_Name}
              </Text>
              <Text style={styles.textFooter}>
                has been reserved for 3 nights.
              </Text>
            </View>
            <Button
              color="#FFF200"
              title="View Details"
              onPress={this.ResetPage.bind(this)}
              buttonStyle={styles.button}
              titleStyle={{
                color: "#432355",
                fontFamily: "OpenSans-SemiBold",
                fontWeight: "600",
                alignContent: "center",
                flex: 1
              }}
            />
          </View>
        </Modal>
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
)(SuccessBookModel);

SuccessBookModel.propTypes = {
  makepayment: PropTypes.func,
  resetPage: PropTypes.func,
  spinnerstart: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  imageHead: {
    alignItems: "center",
    justifyContent: "center",
    width: winWidth / 2.3,
    height: winHeight / 4.7
  },
  button: {
    flex: 0.25,
    borderRadius: 40,
    width: "50%",
    marginTop: -40,
    backgroundColor: "#FFF200"
  },
  filterIconleft: {
    marginRight: 10
  },
  filterButton: {
    borderWidth: 1,
    borderRadius: 19,
    borderColor: "#432355",
    marginTop: -20
  },
  filtertitle: {
    color: "#432355"
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
    alignItems: "center",
    fontSize: 17,
    fontFamily: "OpenSans-Regular",
    color: "#3d3d3d"
  },

  pricevalue: {
    fontSize: 13,
    color: "#432355",
    marginLeft: 10,
    fontFamily: "OpenSans-SemiBold"
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#432355",
    flexDirection: "row",
    height: 65,
    alignItems: "center"
  },
  topbar: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#fff",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d0cfd1"
  },
  selectedColor: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  searchcontainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 0
  },
  inputstyless: {
    fontSize: 14,
    paddingVertical: 1,
    fontFamily: "OpenSans-Regular"
  },
  searchinputstyle: {
    backgroundColor: "#fff",
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});
