import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { Rating } from "react-native-elements";
import ImageHeader from "../components/ImageHeader";
import ImageHeaderextended from "../components/ImageHeaderextended";
import * as commonFunc from "../constants/commonFunctions";
import Icon from "react-native-vector-icons/FontAwesome";
//import { Card, CardTitle, CardImage, CardAction } from "react-native-cards";
import axios from "axios";
import { Spinner } from "./common";
import { connect } from "react-redux";
import * as actions from "../actions";
import Toast from "react-native-simple-toast";

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

let City;
let Pincode;
let FromDate;
let ToDate;
let RoomType;
let checkin;
let checkout;
let guest;
class SearchResult extends React.Component {
  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  constructor(props) {
    super(props);
    City = this.props.navigation.getParam("City", "ch");
    Pincode = this.props.navigation.getParam("Pincode", "ch");
    FromDate = this.props.AllData.CheckIn;
    ToDate = this.props.AllData.CheckOut;
    RoomType = this.props.navigation.getParam("Type", "ch");

    checkin = this.props.AllData.CheckIn;
    checkout = this.props.AllData.CheckOut;
    guest = this.props.AllData.GuestCount;
  }

  FavoriteStarClicked = data => {
    if (this.props.AllData.UserData != null) {
      var newheartids = this.state.heartnameids;

      if (this.props.AllData.favorite.includes(data.Apartment_Unit_Id)) {
        newheartids.splice(newheartids.indexOf(data.Apartment_Unit_Id), 1);
        Toast.show("Removed from Favorites.", Toast.LONG);
      } else {
        newheartids.push(data.Apartment_Unit_Id);
        Toast.show("Saved to Favorites.", Toast.LONG);
      }
      this.setState({ heartnameids: newheartids });
    } else {
      // Toast.show("This is a toast.");
      Toast.show("Please log in to favorite apartments.", Toast.LONG);

      // this.props.navigation.navigate("Login");
      return;
    }
  };

  CheckExistName = hotelid => {
    if (this.props.AllData.favorite.includes(hotelid)) return "heart";
    else return "heart-o";
  };
  async componentDidMount() {
    const res = await axios

      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/search/prop`,
        {
          city: City,
          // pincode: Pincode,
          fromDate: new Date(FromDate),
          toDate: new Date(ToDate),
          type: RoomType,
          guests: parseInt(this.props.AllData.GuestCount)
        }
      )
      .then(({ data }) => {
        this.setState({
          results: data,
          heartnameids: []
        });
        this.props.AddSearchData(this.state.results);

        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ error: true });
        this.setState({ isLoading: false });
      });
  }
  state = { results: [], isLoading: true };
  render() {
    const { maincontainer, container, card, cardImage } = styles;
    return (
      <View style={maincontainer}>
        <ScrollView style={container}>
          {this.state.results.map(items => (
            <TouchableOpacity
              key={items.Apartment_Unit_Id}
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate("Hoteldetails", {
                  itemData: items,
                  HotelTitle: items.Apartment_Name,
                  checkin: checkin,
                  checkout: checkout,
                  HotelTitle: items.Apartment_Name,
                  guest: guest
                });
              }}
            >
              <View style={card}>
                <Image
                  source={{ uri: items.Apartment_Image }}
                  style={cardImage}
                />
                <TouchableOpacity
                  key={items.Apartment_Unit_Id}
                  style={styles.selectedColor}
                  onPress={() => {
                    this.FavoriteStarClicked(items);
                  }}
                >
                  <Icon
                    name={this.CheckExistName(items.Apartment_Unit_Id)}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    paddingTop: 10
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#432355",
                        width: 250,
                        fontFamily: "OpenSans-Semibold"
                      }}
                    >
                      {commonFunc.trunctuateWord(items.Apartment_Name, 28)}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 12,
                        color: "#3d3d3d"
                      }}
                    >
                      {items.Apartment_Full_Address}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#432355",
                        fontFamily: "OpenSans-Semibold"
                      }}
                    >
                      ${items.Apartment_Price_Per_Night} per night
                    </Text>
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 12
                      }}
                    >
                      <Icon
                        name="map-marker"
                        type="font-awesome"
                        color="#3d3d3d"
                        size={12}
                      />
                      {" " +
                        items.Apartment__Nearest_Landmarks[
                          Object.keys(items.Apartment__Nearest_Landmarks)[0]
                        ] +
                        " from " +
                        Object.keys(items.Apartment__Nearest_Landmarks)[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ImageHeaderextended
          title={City}
          navig={this.props.navigation}
          checkin={FromDate}
          checkout={ToDate}
          nextpage="Map"
        />
        {this.renderSpinner()}
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
)(SearchResult);

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: "29%", backgroundColor: "transparent" },
  maincontainer: {
    flex: 1,
    position: "relative"
  },
  card: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    margin: 23,
    marginTop: 12,
    borderColor: "rgba(158, 158, 158, 0.2)",
    borderRadius: 5
    // shadowColor: "#8e8e8e",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    // elevation: 2
  },
  cardImage: {
    flex: 1,
    width: "auto",
    height: 170,
    resizeMode: "cover"
  },

  selectedColor: {
    position: "absolute",
    right: 15,
    top: 15
  }
});
