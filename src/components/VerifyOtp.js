import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);
import { Button } from "react-native-elements";
import CodeInput from "react-native-confirmation-code-input";
let email = "";
let code = "";
import { connect } from "react-redux";
import * as actions from "../actions";

class VerifyOtp extends Component {
  state = {};

  constructor(props) {
    super(props);

    email = this.props.navigation.getParam("email", null);
  }

  // _onFinishCheckingCode1(isValid) {
  //   code = isValid;
  // }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/Forgotpassotp.png")}
          style={styles.imagestyle}
        />

        <View
          style={{
            height: 8,
            justifyContent: "flex-start",
            marginHorizontal: 20
          }}
        >
          <Text
            style={{
              ...styles.plainText,
              color: "#464447",
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
              fontWeight: "bold"
            }}
          >
            Enter the verification code we just send to{"\n"} your email
            address.
          </Text>
          {/* <CodeInput
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

          <TextInput
            style={styles.textinputstyle}
            placeholder="OTP"
            placeholderStyle={{ color: "red" }}
            autoFocus={true}
            onChangeText={text => {
              code = text;
            }}
          />
        </View>

        <View
          style={{
            ...styles.emailView,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Text style={{ justifyContent: "center" }}>
            If you didn't recieved the code!{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Auth.resendSignUp(email)
                .then(() => {
                  console.log("code resent successfully");
                })
                .catch(e => {
                  alert(e.message);
                });
            }}
          >
            <Text
              style={{
                fontSize: 14,
                marginBottom: 4,
                color: "#432355",
                textDecorationLine: "underline",
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          color="#FFF200"
          title="Verify"
          onPress={() => {
            Auth.confirmSignUp(email, code, {
              // Optional. Force user confirmation irrespective of existing alias. By default set to True.
              forceAliasCreation: true
            })
              .then(data => {
                console.log(data);
                alert("Success.");

                this.props.AllData.rootNavigation.navigate("Login");
                this.setState({ isLoading: false });
              })
              .catch(err => {
                alert(err.message);
              });
          }}
          buttonStyle={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF"
  },
  button: {
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#432355",
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 60,
    height: 50
  },

  plainText: {
    textAlign: "center"
  },
  imagestyle: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    width: "auto",
    height: "45%",
    resizeMode: "cover"
  },
  emailView: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: "30%"
  },
  textinputstyle: {
    height: 65,
    borderColor: "#DFDFDF",
    marginLeft: 22,
    marginRight: 22,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 19
  }
});

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(VerifyOtp);
