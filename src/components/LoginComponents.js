import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Alert,
  View,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage
} from "react-native";
import styles from "./LoginSignupStyle";
import PropTypes from "prop-types";
import { Button, CheckBox } from "react-native-elements";
import axios from "axios";
import * as actions from "../actions";
import { connect } from "react-redux";
import TextInputState from "react-native/lib/TextInputState";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);
import { withAuthenticator } from "aws-amplify-react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Navigator, StackActions, NavigationActions } from "react-navigation";
let userdetails = null;

class LoginComponents extends Component {
  constructor(props) {
    super(props);
    this.onLoginSuccess == this.onLoginSuccess.bind(this);
    this.LoginPressed == this.LoginPressed.bind(this);
    this.RetrieveRememberMeData == this.RetrieveRememberMeData.bind(this);
  }
  state = {
    userName: "",
    password: "",
    remember: false
  };

  async LoginPressed() {
    this.props.spinnerstart(true);
    if (this.state.userName == "" || this.state.password == "") {
      Alert.alert(
        "Error",
        "Please enter username & password to login or click on skip for now.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      this.props.spinnerstart(false);

      return;
    }
    const user = await Auth.signIn(
      this.state.userName.toLowerCase(),
      this.state.password
    )
      .then(response => {
        // handle success
        userdetails = response.attributes;

        userdetails.accessToken =
          response.signInUserSession.accessToken.jwtToken;
        userdetails.refreshToken =
          response.signInUserSession.refreshToken.token;
        userdetails.idtoken = response.signInUserSession.idToken.jwtToken;

        this.onLoginSuccess();
      })
      .catch(error => {
        console.log(error.response);

        if (error.code == "UserNotConfirmedException") {
          this.props.navigationData.navigation.navigate("VerifyOtp", {
            email: this.state.userName
          });
          this.props.spinnerstart(false);

          alert("Please confirm your otp send to your  email");
        } else {
          this.props.spinnerstart(false);
          alert(error.message);

          return;
        }
      });
  }

  onSkipping() {
    var tt = this.props.navigationData.navigation.goBack();
    if (tt == false) {
      this.props.navigationData.navigation.navigate("Home");
    }
  }

  SaveRememberMeData = async () => {
    try {
      if (this.state.remember) {
        await AsyncStorage.setItem("RememberUsername", this.state.userName);
        await AsyncStorage.setItem("RememberPassword", this.state.password);
      } else {
        await AsyncStorage.removeItem("RememberUsername");
        await AsyncStorage.removeItem("RememberPassword");
      }
    } catch (error) {}
  };

  componentDidMount() {
    this.RetrieveRememberMeData();
  }

  async RetrieveRememberMeData() {
    try {
      const value1 = await AsyncStorage.getItem("RememberUsername");
      const value2 = await AsyncStorage.getItem("RememberPassword");

      if (value1 !== null && value2 != null) {
        // We have data!!

        this.setState({ userName: value1, password: value2, remember: true });
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  saveuserdata = async datauser => {
    await AsyncStorage.setItem("userdetails", JSON.stringify(datauser));

    console.log();
  };

  async onLoginSuccess() {
    const resp = await axios
      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/users`,

        {
          userDetails: {
            userName: userdetails.name,
            userEmail: userdetails.email,
            userContact: userdetails.phone_number
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userdetails.idtoken
            // Token: userdata.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(({ data }) => {
        userdetails.userID = data.data[0].User_Id;
        console.log(data);
      })
      .catch(error => {
        console.log(error.response);
      });
    this.SaveRememberMeData();

    this.props.AddUserData(userdetails);

    this.saveuserdata(userdetails);

    if (this.props.AllData.HotelData == null && this.props.favorite == null) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      });

      this.props.navigationData.navigation.dispatch(resetAction);
    } else {
      this.setState({ isLoading: false });

      if (this.props.favorite != null) {
        //get hotel and user and send to api save
        //send to favorite page, show message "Your favrite save"
      } else {
        this.props.navigationData.navigation.navigate("PreviewBookingDetails");
      }
    }
  }
  // variable to hold the references of the textfields
  inputs = {};
  // function to focus the field
  focusTheField = id => {
    this.inputs[id].focus();
  };

  ClickTheFeild = id => {
    this.LoginPressed();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 7,
            justifyContent: "space-evenly"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Auth.federatedSignIn({ provider: "Facebook" }).then(
                crednetials => {
                  console.log("crednetials=", crednetials);
                }
              );
            }}
          >
            <Image
              source={require("../assets/social/fb.png")}
              style={styles.socialImage}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/social/linkedin.png")}
            style={styles.socialImage}
          />
          <Image
            source={require("../assets/social/twitter.png")}
            style={styles.socialImage}
          />
          <Image
            source={require("../assets/social/google.png")}
            style={styles.socialImage}
          />
        </View>
        <Text style={{ textAlign: "center", color: "#cccccc", margin: 10 }}>
          ——— OR ———
        </Text>

        <Text style={styles.plainText}>Email address</Text>
        <TextInput
          style={styles.textinputstyle}
          returnKeyType={"next"}
          value={this.state.userName}
          onSubmitEditing={() => {
            this.focusTheField("Passfield");
          }}
          onChangeText={text => this.setState({ userName: text })}
        />

        <Text style={{ ...styles.plainText, marginTop: 16 }}>Password</Text>
        <TextInput
          ref="passwordinput"
          secureTextEntry={true}
          style={styles.textinputstyle}
          returnKeyType="go"
          value={this.state.password}
          onSubmitEditing={() => {
            this.ClickTheFeild("Login");
          }}
          ref={input => {
            this.inputs["Passfield"] = input;
          }}
          onChangeText={text => this.setState({ password: text })}
        />
        <TouchableOpacity
          onPress={() => this.setState({ remember: !this.state.remember })}
          style={{
            flexDirection: "row",
            margin: 10,
            marginTop: 0,
            justifyContent: "flex-start"
          }}
        >
          <CheckBox
            checked={this.state.remember}
            checkedColor="#3d3d3d"
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderColor: "transparent"
            }}
            textStyle={{
              fontFamily: "OpenSans-Regular",
              fontWeight: "400",
              color: "#3d3d3d"
            }}
            title="Remember me"
            onPress={() => {
              this.setState({ remember: !this.state.remember });
            }}
          />
        </TouchableOpacity>
        <Button
          color="#FFF200"
          title="DONE"
          onPress={this.LoginPressed.bind(this)}
          buttonStyle={styles.button}
          ref={input => {
            this.inputs["Login"] = input;
          }}
          titleStyle={{ color: "#432355", fontFamily: "OpenSans-SemiBold" }}
        />
        <Text />
        <TouchableOpacity
          style={styles.ForgotPass}
          onPress={() =>
            this.props.navigationData.navigation.navigate(
              "ForgotPasswordHome",
              {
                //query: this.state.place
              }
            )
          }
        >
          <Text style={{ color: "#432355", top: 0 }}>Forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSkipping.bind(this)}>
          <Text style={styles.skipapp}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(LoginComponents);

LoginComponents.propTypes = {
  spinnerstart: PropTypes.func
};
