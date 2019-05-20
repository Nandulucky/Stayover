import React, { Component } from "react";
import {
  createAppContainer,
  NavigationEvents,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

// import Icon from "react-native-vector-icons/Entypo";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Inbox, Profile, Trips, Explore, Saved } from "./FooterElements";
let tabIndex = null;
var mapStateToProps = State => {
  tabIndex = State.CurrentPage;
  return { AllData: State };
};
class Home extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const Homes = createBottomTabNavigator(
      {
        Explore: {
          screen: ({ navigation }) => (
            <Explore
              navigation={navigation}
              screenProps={{ rootNavigation: this.props.navigation }}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => (
              <Icon style={{ fontSize: 25 }} color={tintColor}>
                search
              </Icon>
            ),
            tabBarOptions: {
              activeTintColor: "#432355"
            }
          })
        },
        Favorites: {
          screen: ({ navigation }) => (
            <Saved
              navigation={navigation}
              screenProps={{ rootNavigation: this.props.navigation }}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => (
              <Icon style={{ fontSize: 25 }} color={tintColor}>
                favorite
              </Icon>
            ),
            tabBarOptions: {
              activeTintColor: "#432355"
            }
          })
        },
        Trips: {
          screen: ({ navigation }) => (
            <Trips
              navigation={navigation}
              screenProps={{ rootNavigation: this.props.navigation }}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => (
              <Icon style={{ fontSize: 25 }} color={tintColor}>
                work
              </Icon>
            ),
            tabBarOptions: {
              activeTintColor: "#432355"
            }
          })
        },
        Inbox: {
          screen: ({ navigation }) => (
            <Inbox
              navigation={navigation}
              screenProps={{ rootNavigation: this.props.navigation }}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => (
              <Icon style={{ fontSize: 25 }} color={tintColor}>
                chat_bubble
              </Icon>
            ),
            tabBarOptions: {
              activeTintColor: "#432355"
            }
          })
        },
        Profile: {
          screen: ({ navigation }) => (
            <Profile
              navigation={navigation}
              screenProps={{ rootNavigation: this.props.navigation }}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => (
              <Icon style={{ fontSize: 25 }} color={tintColor}>
                person
              </Icon>
            ),
            tabBarOptions: {
              activeTintColor: "#432355"
            }
          })
        }
      },
      {
        activeColor: "#432355",
        inactiveColor: "#cacaca",
        labeled: true,
        initialRouteName: tabIndex
      }
    );

    const Hometab = createAppContainer(connect(mapStateToProps)(Homes));
    return <Hometab />;
  }
}

export default Home;
