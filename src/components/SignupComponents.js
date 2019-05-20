import React, { Component } from "react";
import {
  StyleSheet,
  Alert,
  Picker,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./LoginSignupStyle";

import { CheckBox } from "react-native-elements";
import { Spinner } from "../components/common/";
import { StackActions, NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import axios from "axios";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);
let userdetails = null;
import { connect } from "react-redux";
import * as actions from "../actions";
//import TextInputMask from "react-native-text-input-mask";
import { ScrollView } from "react-native-gesture-handler";

class SignupComponents extends Component {
  state = {
    userName: "",
    password: "",
    name: "",
    countryCode: "US",
    contactNo: "+1"
  };

  constructor(props) {
    super(props);
    this.SignupPressed == this.SignupPressed.bind(this);
  }
  async SignupPressed() {
    this.props.spinnerstart(true);
    if (
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.name == "" ||
      this.state.lastname == "" ||
      this.state.contactNo == ""
    ) {
      alert("Please enter all the feilds.");
      this.props.spinnerstart(false);

      return;
    }
    try {
      const newUser = await Auth.signUp({
        username: this.state.userName.toLowerCase(),
        password: this.state.password,

        attributes: {
          email: this.state.userName.toLowerCase(), // optional
          phone_number: this.state.contactNo, // optional - E.164 number convention
          //countryCode: "US"
          name: this.state.name + " " + this.state.lastname
        }
      }).then(response => {
        console.log(response);
        this.props.AllData.rootNavigation.navigate("VerifyOtp", {
          email: this.state.userName
        });
        alert("Signup success.");

        this.props.spinnerstart(false);
      });
    } catch (e) {
      alert(e.message);
      this.props.spinnerstart(false);
    }
  }

  inputs = {};

  focusTheField = id => {
    this.inputs[id].focus();
  };

  ClickTheFeild = id => {
    this.SignupPressed();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          style={{
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              ...styles.plainText
            }}
          >
            First Name
          </Text>
          <Text style={{ ...styles.plainText, marginLeft: "27%" }}>
            Last name
          </Text>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{ flexDirection: "row", marginLeft: 20 }}>
          <TextInput
            style={{ ...styles.textinputstyle, width: "45%", marginLeft: 0 }}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.focusTheField("Lastname");
            }}
            onChangeText={text => {
              this.setState({ name: text });
            }}
          />
          <TextInput
            ref={input => {
              this.inputs["Lastname"] = input;
            }}
            onSubmitEditing={() => {
              this.focusTheField("EmailFeild");
            }}
            onChangeText={text => {
              this.setState({ lastname: text });
            }}
            style={{ ...styles.textinputstyle, width: "45%", marginLeft: 0 }}
          />
        </KeyboardAvoidingView>

        <Text />
        <Text style={styles.plainText}>Email address</Text>
        <TextInput
          style={styles.textinputstyle}
          returnKeyType={"next"}
          ref={input => {
            this.inputs["EmailFeild"] = input;
          }}
          onSubmitEditing={() => {
            this.focusTheField("Passfield");
          }}
          onChangeText={text => {
            this.setState({ userName: text });

            // var pattern = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

            // if (pattern.test(text) == 0) {
            //   this.setState({ userName: text });
            // } else {
            //   this.setState({ email: text });
            // }
          }}
        />
        <Text />
        <Text style={styles.plainText}>Password</Text>
        <TextInput
          style={styles.textinputstyle}
          ref={input => {
            this.inputs["Passfield"] = input;
          }}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            this.focusTheField("Contact");
          }}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />
        <Text />
        <KeyboardAvoidingView
          style={{
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              ...styles.plainText
            }}
          >
            Country
          </Text>
          <Text style={{ ...styles.plainText, marginLeft: "18.5%" }}>
            Contact No.
          </Text>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{ flexDirection: "row", marginLeft: 30 }}>
          <TextInput
            style={{ ...styles.textinputstyle, width: "25%", marginLeft: 0 }}
            editable={false}
            value="US"
          />
          {/* <TextInputMask
            style={{ ...styles.textinputstyle, width: "55%", marginLeft: "6%" }}
            ref={input => {
              this.inputs["Contact"] = input;
            }}
            returnKeyType="go"
            onChangeText={(formatted, extracted) => {
              console.log(formatted); // +1 (123) 456-78-90
              console.log(extracted); // 1234567890
              this.setState({ contactNo: "+1" + extracted });
            }}
            onFocus={() => {
              if (this.state.contactNo == "") {
                this.setState({ contactNo: "+1" });
              }
            }}
            value={this.state.contactNo}
            onSubmitEditing={() => {
              this.ClickTheFeild("Signup");
            }}
            keyboardType="numeric"
            mask={"+1 ([000]) [000] [00] [00]"}
          /> */}
          <TextInput
            style={{ ...styles.textinputstyle, width: "55%", marginLeft: "6%" }}
            ref={input => {
              this.inputs["Contact"] = input;
            }}
            returnKeyType="go"
            onFocus={() => {
              if (this.state.contactNo == "") {
                this.setState({ contactNo: "+1" });
              }
            }}
            value={this.state.contactNo}
            onSubmitEditing={() => {
              this.ClickTheFeild("Signup");
            }}
            keyboardType="numeric"
            onChangeText={text => this.setState({ contactNo: text })}
          />
        </KeyboardAvoidingView>
        <Text />
        <Button
          title="SIGN UP"
          buttonStyle={{ ...styles.button, backgroundColor: "#432355" }}
          titleStyle={{ color: "white" }}
          onPress={this.SignupPressed.bind(this)}
        />
      </ScrollView>
    );
  }
}

SignupComponents.propTypes = {
  spinnerstart: PropTypes.func
};

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(SignupComponents);

const styldes = StyleSheet.create({
  container: {
    flex: 0.47,
    backgroundColor: "#fff",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  skipapp: {
    textAlign: "center",
    textDecorationLine: "underline"
  },
  loginarea: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",

    backgroundColor: "#eee"
  },

  loginbuttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
    top: 230,
    left: 0,
    width: "100%",

    right: 0
  },
  loginoption: {
    flex: 1,
    position: "relative",
    padding: 20,
    left: 0,
    right: 0
  },
  ForgotPass: {
    flex: 1,
    color: "#432355",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  plainText: {
    flex: 1,
    color: "#432355",
    fontWeight: "bold"
  },
  remember: {
    alignItems: "flex-start",
    justifyContent: "center",
    left: "10%",
    top: 5,
    position: "absolute",
    color: "#432355"
  },
  button: {
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#FFF200",
    top: "3%"
  },
  iconRight: {
    position: "absolute",
    top: 12,
    right: 10
  },
  textinputstyle: {
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 2,
    borderRadius: 25
  }
});
