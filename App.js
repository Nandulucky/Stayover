/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MenuProvider } from "react-native-popup-menu";

import reducers from "./src/reducers";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      </Provider>
    );
  }
}
