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
class ForgotPasswordHome extends Component {
  state = { email: "" };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/Forgotpass.png")}
          style={styles.imagestyle}
        />
        <Text
          style={{
            ...styles.plainText,
            fontWeight: "bold",
            color: "#464447",
            fontSize: 16,
            fontFamily: "OpenSans-Regular"
          }}
        >
          Enter the email associated with your account
        </Text>
        <Text
          style={{
            ...styles.plainText,
            color: "#808080",
            fontSize: 14,
            fontFamily: "OpenSans-Regular"
          }}
        >
          We will email you a link to reset your password
        </Text>
        <Text />
        <View style={styles.emailView}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "#432355",
              fontFamily: "OpenSans-Regular",
              marginBottom: 8
            }}
          >
            Enter Email address
          </Text>
          <TextInput
            style={styles.textinputstyle}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <Text />
        <Button
          color="#FFF200"
          title="Send"
          onPress={() => {
            if (this.state.email != "") {
              Auth.forgotPassword(this.state.email)
                .then(data => console.log(data))
                .catch(err => {
                  alert(err.message);
                  console.log(err);
                });
              this.props.AllData.rootNavigation.navigate("ResetPassword");
            } else {
              alert("Please enter your email");
              return;
            }
            this.props.AllData.rootNavigation.navigate("ResetPassword", {
              email: this.state.email
            });
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
)(ForgotPasswordHome);
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
    height: 50,
    marginRight: 100,
    marginBottom: 80
  },

  plainText: {
    textAlign: "center"
  },
  imagestyle: {
    margin: 10,
    marginBottom: -12,
    width: "auto",
    height: "45%",
    resizeMode: "cover"
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
