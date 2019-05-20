import React from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Avatar, ListItem, Button } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";
import ProductStyles from "../Details/ProductStyle";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import * as actions from "../../actions";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
Amplify.configure(awsConfig);
const styles = StyleSheet.create({ ...ProductStyles });
class Profile extends React.Component {
  state = {
    pushNotifications: true
  };

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications
    }));
  };
  renderProfile() {
    if (this.props.AllData.UserData != null) {
      return (
        <View style={{ flexDirection: "row", margin: 10 }}>
          <View style={styles.userName}>
            <TouchableOpacity
              onPress={() => {
                this.props.AllData.rootNavigation.navigate(
                  "PreviewPersonalDetails"
                );
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#484848",
                  fontFamily: "OpenSans-Bold"
                }}
              >
                {this.props.AllData.UserData.name}
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  fontFamily: "OpenSans-Regular"
                }}
              >
                View and edit profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userblankspace} />
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={require("../../assets/profile.png")}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            margin: 25,
            marginTop: "10%"
            // justifyContent: "center"
          }}
        >
          <Button
            title="Sign-in to Stayovr"
            color="#841584"
            onPress={() => {
              this.props.AllData.rootNavigation.navigate("Login");
            }}
            buttonStyle={styles.bigbutton}
            titleStyle={{
              color: "#432355",
              fontSize: 18,
              fontFamily: "OpenSans-SemiBold"
            }}
          />
        </View>
      );
    }
  }
  async logoutuser() {
    await AsyncStorage.removeItem("userdetails");
    this.props.AddUserData(null);
    this.props.AddHotelData(null);
    this.props.AddFavorites([]);
  }
  renderLogout = () => {
    if (this.props.AllData.UserData != null) {
      return (
        <ListItem
          title={
            <Text
              style={{
                fontSize: 20,
                fontFamily: "OpenSans-Regular",
                color: "#4d4e4e"
              }}
            >
              Log-out
            </Text>
          }
          containerStyle={styles.listItemContainer}
          rightIcon={
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../../assets/logout.png")}
            />
          }
          onPress={() => {
            this.props.AddUserData(null);
            this.logoutuser();
            Auth.signOut({ global: true })
              .then(data => console.log(data))
              .catch(err => console.log(err));
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Login" })]
            });
            this.props.AllData.rootNavigation.dispatch(resetAction);
          }}
        />
      );
    }
  };

  renderHeader = () => {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: "#432355",
          justifyContent: "center",
          paddingHorizontal: 5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 0,
            alignItem: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icons
              name="arrow-left"
              color="#fff"
              style={{
                fontSize: 25,
                paddingTop: 8,
                fontFamily: "OpenSans-Regular"
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: "column", flexBasis: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: "38%",
                paddingTop: 8,
                color: "#fff",
                fontFamily: "OpenSans-Regular"
              }}
            >
              Profile
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderHeader()}

        {/* <ScrollView style={styles.scrollprofile}> */}
        {this.renderProfile()}
        <View style={styles.liststyle}>
          <ListItem
            title={
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                  color: "#4d4e4e"
                }}
              >
                Notifications
              </Text>
            }
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                trackColor={{ true: "#432355", false: "#cacaca" }}
                thumbColor={
                  this.state.pushNotifications == true ? "#432355" : "#cacaca"
                }
                onValueChange={this.onChangePushNotifications}
                value={this.state.pushNotifications}
              />
            }
          />
          {/* <ListItem
            title={
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                  color: "#4d4e4e"
                }}
              >
                Credits & coupons
              </Text>
            }
            containerStyle={styles.listItemContainer}
            rightIcon={
              <Image
                style={{ height: 25, width: 42 }}
                source={require("../../assets/coupon.png")}
              />
            }
          /> */}
          <ListItem
            title={
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                  color: "#4d4e4e"
                }}
              >
                About
              </Text>
            }
            containerStyle={styles.listItemContainer}
            rightIcon={
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../assets/invite.png")}
              />
            }
          />
          <ListItem
            title={
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                  color: "#4d4e4e"
                }}
              >
                Privacy Policy
              </Text>
            }
            containerStyle={styles.listItemContainer}
            rightIcon={
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../assets/setting.png")}
              />
            }
          />
          <ListItem
            title={
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                  color: "#4d4e4e"
                }}
              >
                Get help
              </Text>
            }
            containerStyle={styles.listItemContainer}
            rightIcon={
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../assets/help.png")}
              />
            }
          />
          {this.renderLogout()}
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}
var mapStateToProps = State => {
  return { AllData: State };
};
const ConnectComponent = connect(
  mapStateToProps,
  actions
)(Profile);
export { ConnectComponent as Profile };
