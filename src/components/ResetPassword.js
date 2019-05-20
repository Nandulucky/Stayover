import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import CodeInput from "react-native-confirmation-code-input";
let email = "";
class ResetPassword extends Component {
  state = { email: "", password: "", passwordAgain: "", code: "" };

  constructor(props) {
    super(props);

    email = this.props.navigation.getParam("email", null);
    this._onFinishCheckingCode1 = this._onFinishCheckingCode1.bind(this);
  }
  _onFinishCheckingCode1(isValid) {}
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/verification.png")}
          style={styles.imagestyle}
        />

        <Text
          style={{
            ...styles.plainText,
            color: "#464447",
            fontFamily: "OpenSans-Regular",
            marginLeft: 25,
            marginRight: 25
          }}
        >
          Enter the verification code we just sent to your email address.
        </Text>

        {/* <CodeInput
            ref="codeInputRef2"
            activeColor="#432355"
            inactiveColor="#432355"
            autoFocus={true}
            className={"border-b"}
            codeLength={6}
            ignoreCase={true}
            codeInputStyle={{ color: "#432355", fontSize: 28 }}
            inputPosition="center"
            size={40}
            borderColor={{ color: "#432355" }}
            onFulfill={isValid => this._onFinishCheckingCode1(isValid)}
          /> */}

        <View style={styles.emailView}>
          <TextInput
            style={styles.textinputstylebold}
            placeholder="OTP"
            autoFocus={true}
            onChangeText={text => {
              this.setState({ code: text });
            }}
          />
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              fontSize: 16,
              color: "#432355",
              fontFamily: "OpenSans-Regular"
            }}
          >
            Enter new password
          </Text>
          <TextInput
            style={styles.textinputstyle}
            onChangeText={text => this.setState({ password: text })}
          />
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              color: "#432355",
              fontSize: 16,
              fontFamily: "OpenSans-Regular"
            }}
          >
            Confirm password
          </Text>
          <TextInput
            style={styles.textinputstyle}
            onChangeText={text => this.setState({ passwordAgain: text })}
          />
        </View>
        <Button
          color="#FFF200"
          title="Confirm"
          onPress={() => {
            if (this.state.password == this.state.passwordAgain) {
              if (this.state.code == "" || this.state.password == "") {
                alert("Enter all the feilds");
                return;
              }
              Auth.forgotPasswordSubmit(
                email,
                this.state.code,
                this.state.password
              )
                .then(data => {
                  this.props.AllData.rootNavigation.navigate("Login");
                  alert("Password changed succesfully!");
                })
                .catch(err => alert(err.message));
            } else {
              alert("Password don't match!");
            }
          }}
          buttonStyle={styles.button}
        />
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
)(ResetPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "white",
    margin: 0
  },
  button: {
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#432355",
    marginLeft: 120,
    marginRight: 120
    //  marginBottom: 80
  },

  plainText: {
    textAlign: "center",
    color: "#3d3d3d",
    fontFamily: "OpenSans-Regular",
    fontSize: 15
  },
  imagestyle: {
    width: "auto",
    height: "42.5%",
    resizeMode: "cover"
  },
  textinputstylebold: {
    height: 45,
    borderColor: "#DFDFDF",
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 0.7,
    marginBottom: 20,
    borderRadius: 14
  },
  emailView: {
    marginLeft: 40,
    marginRight: 40
  },
  textinputstyle: {
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 0.7,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderRadius: 14,
    fontFamily: "OpenSans-Regular",
    paddingHorizontal: 15
  }
});
