import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { CheckBox } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";
import { NavigationActions, StackActions } from "react-navigation";
import { Spinner } from "./common";
import LoginComponents from "./LoginComponents";
import SignupComponents from "./SignupComponents";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import * as actions from "../actions";

let hotelDetails = null;
let checkin = null;
let checkout = null;
let guest;
let favorite = null;

class LoginSignup extends Component {
  state = {
    isLoading: false,
    currIndex: 0,
    headColor: "#432355"
  };

  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  changePage(value) {
    if (value === "login" && this.refs.swiper.state.index == 1) {
      this.setState({ headColor: "#432355" });
      this.refs.swiper.scrollBy(-1);
      this.refs.swipertop.scrollBy(-1);
    } else if (value === "signup" && this.refs.swiper.state.index == 0) {
      this.setState({ headColor: "white" });

      this.refs.swiper.scrollBy(1);
      this.refs.swipertop.scrollBy(1);
    }
  }

  constructor(props) {
    super(props);
    this.SpinnerStart = this.SpinnerStart.bind(this);
    hotelDetails = this.props.AllData.HotelData;
    checkin = this.props.AllData.CheckIn;
    checkout = this.props.AllData.CheckOut;
    userdetails = this.props.AllData.UserData;
    guest = this.props.AllData.GuestCount;

    this.logoutuser();
  }
  async logoutuser() {
    await AsyncStorage.removeItem("userdetails");
  }

  SpinnerStart(value) {
    this.setState({ isLoading: value });
  }
  onLoginSuccess() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });

    this.setState({ isLoading: false });
    this.props.AllData.rootNavigation.dispatch(resetAction);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <KeyboardAvoidingView
          style={{
            ...styles.loginarea
          }}
        >
          <Swiper
            ref="swipertop"
            showsButtons={false}
            loop={false}
            showsPagination={false}
          >
            <Image
              source={require("../assets/login.png")}
              style={styles.logimage}
            />
            <Image
              source={require("../assets/authentication.png")}
              style={styles.logimage}
            />
          </Swiper>
        </KeyboardAvoidingView>
        <Swiper
          ref="swiper"
          style={{ top: "38%" }}
          showsButtons={false}
          scrollEnabled={false}
          loop={false}
          showsPagination={false}
        >
          <LoginComponents
            navigationData={this.props}
            spinnerstart={this.SpinnerStart}
          />

          <SignupComponents
            navigationData={this.props}
            spinnerstart={this.SpinnerStart}
          />
        </Swiper>
        <KeyboardAvoidingView style={styles.loginbuttoncontainer}>
          <SwitchSelector
            ref="switch"
            initial={0}
            onPress={value => this.changePage(value)}
            selectedTextStyle={{
              fontFamily: "OpenSans-Semibold",
              fontWeight: "bold"
            }}
            textColor="#808080" //'#7a44cf'
            backgroundColor="#f5f5f5"
            selectedColor={this.state.headColor}
            borderColor="#fff"
            height={50}
            hasPadding={false}
            options={[
              {
                label: "Log in",
                value: "login",
                activeColor: "#FFF200"
              },
              {
                label: "Sign Up",
                value: "signup",
                activeColor: "#432355"
              }
            ]}
            style={styles.SwitchSelectorsss}
          />
        </KeyboardAvoidingView>
        {this.renderSpinner()}
      </KeyboardAvoidingView>
    );
  }
}

var mapStateToProps = State => {
  return { AllData: State };
};
export default connect(
  mapStateToProps,
  actions
)(LoginSignup);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loginarea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "33%"
    //padding: 20
  },
  iconRight: {
    position: "absolute",
    top: 12,
    right: 10
  },
  logimage: { flex: 1, width: "100%", height: "100%" },
  loginbuttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    top: "26%",
    left: 0,
    right: 0
  },
  loginoption: {
    flex: 1,

    position: "absolute",
    padding: 20,
    top: "35%",
    left: 0,
    right: 0
  },
  ForgotPass: {
    flex: 1,
    color: "#432355",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  plainText: {
    flex: 1,
    color: "#432355",
    fontWeight: "bold"
  },
  textinputstyle: {
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 2,
    borderRadius: 25
  },
  SwitchSelectorsss: {}
});
