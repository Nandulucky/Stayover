import React, { Component } from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";

export default class InputText extends Component {
  state = {};
  render() {
    return (
      <TextInput
        style={this.props.inputStyle}
        placeholder={this.props.placeholder}
      />
    );
  }
}
