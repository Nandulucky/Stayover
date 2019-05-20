import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Header,
  Dimensions,
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import * as actions from "../actions";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome";
import Icones from "react-native-vector-icons/Entypo";
import * as commonFunc from "../constants/commonFunctions";
const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

class ImageHeaderextended extends Component {
  constructor(props) {
    super(props);
    this.GetHeader = this.GetHeader.bind(this);
  }

  formatDate(date) {
    if (date == "") {
      return;
    }
    var newd = new Date(date);
    var day = newd.getDay();
    var monthIndex = newd.getMonth();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return month[monthIndex] + " " + newd.getDate();
  }
  GetHeader(val) {
    switch (val) {
      case 1:
        return (
          <Menu>
            <MenuTrigger>
              <Button
                title="Sort"
                disabled={true}
                disabledStyle={styles.filterButton}
                disabledTitleStyle={{ color: "white" }}
                icon={
                  <Icons
                    name="sort"
                    color="#fff"
                    size={18}
                    style={styles.filterIconleft}
                  />
                }
                buttonStyle={styles.filterButton}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Distance`)}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                  Distance
                </Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Price low to high`)}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                  Price (low to high)
                </Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Price high to low`)}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                  Price (high to low)
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        );

      case 2:
        return (
          <Button
            title="Filter"
            onPress={() => {}}
            icon={
              <Icons
                name="filter"
                color="#fff"
                size={18}
                style={styles.filterIconleft}
              />
            }
            buttonStyle={styles.filterButton}
          />
        );

      case 3:
        return (
          <Button
            title={this.props.nextpage}
            onPress={() =>
              this.props.nextpage == "Map"
                ? this.props.navig.navigate("HotelMapView", {
                    title: this.props.title
                  })
                : this.props.navig.goBack()
            }
            icon={
              <Icon
                name={
                  this.props.nextpage == "Map"
                    ? "map-marker"
                    : "format-list-bulleted"
                }
                color="#fff"
                size={18}
                style={styles.filterIconleft}
              />
            }
            buttonStyle={styles.filterButton}
          />
        );
    }
  }
  render() {
    const { imageHead } = styles;

    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 0.24,
          position: "absolute"
        }}
      >
        <Image source={require("../assets/bg.png")} style={imageHead} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingTop: 20
          }}
        >
          <TouchableOpacity onPress={() => this.props.navig.goBack()}>
            <Icon name="arrow-left" color="#fff" size={25} />
          </TouchableOpacity>
          <Text style={styles.textstyle}>
            {commonFunc.trunctuateWord(
              this.props.title.charAt(0).toUpperCase() +
                this.props.title.slice(1),
              15
            )}
          </Text>
          <Text style={styles.dateshow}>
            {this.formatDate(new Date(this.props.checkin))} -{" "}
            {this.formatDate(new Date(this.props.checkout))}
          </Text>
          <Text style={styles.guestshow}>
            {this.props.AllData.GuestCount + " Guests"}
          </Text>
          <Menu>
            <MenuTrigger>
              <Icones name="dots-three-vertical" color="#fff" size={20} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Recently Viewed`)}>
                <Text style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                  Recently Viewed
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <FlatGrid
          style={styles.headmenu}
          itemDimension={winWidth / 4}
          items={[1, 2, 3]}
          renderItem={({ item }) => this.GetHeader(item)}
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
)(ImageHeaderextended);

const styles = StyleSheet.create({
  textstyle: {
    color: "white",
    marginLeft: 15,
    fontSize: 16,
    width: "28%",
    fontFamily: "OpenSans-Regular"
  },
  dateshow: {
    color: "white",
    fontSize: 15,
    width: "28%",
    fontFamily: "OpenSans-Regular"
  },
  guestshow: {
    color: "white",
    fontSize: 16,
    width: "20%",
    marginLeft: 35,
    fontFamily: "OpenSans-Regular"
  },
  buttonFooter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  filterIconleft: {
    marginRight: 8
  },
  filterButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: "transparent"
  },
  borderCenter: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#FFA890"
  },
  textFooter: {
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18,
    fontFamily: "OpenSans-Regular"
  },
  headmenu: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "transparent"
  },

  imageHead: {
    flex: 1,
    resizeMode: "stretch",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "transparent",
    width: winWidth,
    height: winHeight * 0.22
  }
});
