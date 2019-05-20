import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Header,
  Dimensions,
  StyleSheet
} from "react-native";

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

class ImageHeader extends Component {
  render() {
    const { imageHead, textstyle } = styles;

    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 0.24,
          position: "absolute"
        }}
      >
        <Image source={require("../assets/bg.png")} style={imageHead} />
        <Text style={styles.textstyle}>{this.props.title}</Text>
      </View>
    );
  }
}

export default ImageHeader;

const styles = StyleSheet.create({
  textstyle: {
    height: 40,
    color: "white",
    marginLeft: "50%",

    top: 13,
    fontSize: 24,
    fontFamily: "OpenSans-Regular"
  },

  imageHead: {
    flex: 1,
    resizeMode: "stretch",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: winWidth,
    height: winHeight * 0.15
  }
});
