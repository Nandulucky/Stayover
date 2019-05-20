import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./components/Home";
import { Text, View, Image, Header, StyleSheet } from "react-native";
import SearchResult from "./components/SearchResult";
import LoginSignup from "./components/LoginSignup";
import Splash from "./Splash";
import ImageHeader from "./components/ImageHeader";
import Hoteldetails from "./components/Details/Hoteldetails";
import HotelMapView from "./components/HotelMapView";
import PreviewBookingDetails from "./components/Details/PreviewBookingDetails";
import PreviewPersonalDetails from "./components/Details/PreviewPersonalDetails";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPasswordHome from "./components/ForgotPasswordHome";
import ResetPassword from "./components/ResetPassword";

const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: ({ navigation }) => ({
        title: "Splash",
        header: null
      })
    },

    Login: {
      screen: LoginSignup,
      navigationOptions: ({ navigation }) => ({
        title: "LoginSignup",
        header: null
      })
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Explore",
        header: null,
        contentOptions: {
          style: {
            backgroundColor: "green",
            flex: 1
          }
        }
      })
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: ({ navigation }) => ({
        title: "Forgot Password",
        header: null
      })
    },
    ForgotPasswordHome: {
      screen: ForgotPasswordHome,
      navigationOptions: ({ navigation }) => ({
        title: "Forgot Password",
        header: null
      })
    },
    VerifyOtp: {
      screen: VerifyOtp,
      navigationOptions: ({ navigation }) => ({
        title: "Forgot Password OTP",
        header: null
      })
    },
    SearchResult: {
      screen: SearchResult,
      navigationOptions: ({ navigation }) => ({
        title: "SearchResult",
        header: null
      })
    },

    Hoteldetails: {
      screen: Hoteldetails,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("HotelTitle", "Hotel details"),
        // headerTintColor: "white",
        // headerStyle: {
        //   backgroundColor: "#432355"
        // }
        header: null
      })
    },
    PreviewBookingDetails: {
      screen: PreviewBookingDetails,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam(
          "PreviewBookingTitle",
          "Preview Booking Details"
        ),
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#432355"
        },
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          flex: 0.9
        }
      })
    },
    PreviewPersonalDetails: {
      screen: PreviewPersonalDetails,
      navigationOptions: ({ navigation }) => ({
        title: "Edit Profile",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#432355"
        },
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          flex: 0.9
        }
      })
    },
    CheckoutPage: {
      screen: CheckoutPage,
      navigationOptions: ({ navigation }) => ({
        title: "Checkout",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#432355"
        },
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          flex: 0.8
        }
      })
    },

    HotelMapView: {
      screen: HotelMapView,
      navigationOptions: ({ navigation }) => ({
        title: "HotelMapView",
        header: null
      })
    }
  },
  {
    headerMode: "float"
  }
);

export default createAppContainer(AppNavigator);
