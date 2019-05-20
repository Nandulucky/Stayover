import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

export default class Splash extends Component {
  state = {};
  componentWillMount() {
    setTimeout(this.startProcess.bind(this), 2000); //login logic here
  }
  startProcess() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    const { splashimg, container } = styles;

    return (
      <View style={container}>
        <Image source={require("./assets/splash.png")} style={splashimg} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  splashimg: {
    flex: 1,
    resizeMode: "stretch",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
});
