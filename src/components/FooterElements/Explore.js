import React from "react";
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Image
} from "react-native";
import { Rating } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import DatePickerModal from "../popupsModal/DatePickerModal";
import GuestsRoomtype from "../popupsModal/GuestsRoomtype";
import SearchCity from "../popupsModal/SearchCity";
import * as commonFunc from "../../constants/commonFunctions";
import Filter from "../popupsModal/Filters";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Toast from "react-native-simple-toast";
import axios from "axios";

import { Button, SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import hoteldata from "../../hoteldata";
const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

const daysToAdd = 3;

class Explore extends React.Component {
  state = {
    showplace: "",
    place: "",
    checkin: new Date().toDateString(),
    checkout: new Date(
      new Date().setDate(new Date().getDate() + daysToAdd) //add days
    ).toDateString(),
    guestcount: 1,
    roomtype: "1BR",
    pincode: "",
    heartnameids: [],
    cards: []
  };

  constructor(props) {
    super(props);

    this.saveDate = this.saveDate.bind(this);
    //index = this.props.navigation.getParam("tabIndex", null);

    this.savePlace = this.savePlace.bind(this);
    this.saveRoomType = this.saveRoomType.bind(this);
    this.saveGuests = this.saveGuests.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.FavoriteStarClicked = this.FavoriteStarClicked.bind(this);

    this.props.SaveRootNavigation(this.props.screenProps.rootNavigation);
    heartnameids = this.props.AllData.favorite;

    this.getUserData();
  }
  async componentWillMount() {
    const res = await axios

      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/search/prop`,
        {
          city: "plano",
          // pincode: Pincode,
          fromDate: this.state.checkin,
          toDate: this.state.checkout,
          type: this.state.roomtype,
          guests: parseInt(this.state.guestcount)
        }
      )
      .then(({ data }) => {
        this.setState({
          cards: data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ error: true });
        this.setState({ isLoading: false });
      });
  }

  getUserData = async () => {
    try {
      const userdata = JSON.parse(await AsyncStorage.getItem("userdetails"));
      if (userdata != null) {
        this.props.AddUserData(userdata);
        const res = await axios
          .post(
            `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/favorites`,
            {
              userDetails: {
                userId: userdata.userID,
                userName: userdata.name,
                userEmail: userdata.email,
                userContact: userdata.phone_number
              }
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userdata.idtoken
                // Token: userdata.accessToken
              } //refreshToken, idtoken,accessToken
            }
          )
          .then(({ data }) => {
            console.log(data);
            var tempFav = [];
            for (i = 0; i < data.items.length; i++) {
              tempFav.push(data.items[i].unitId);
            }
            this.props.AddFavorites(tempFav);
            this.setState({ heartnameids: tempFav });
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  savePlace(showval, pincode, City) {
    this.setState({ showplace: showval });
    this.setState({ place: City });
    this.setState({ pincode: pincode });
  }

  saveDate(value1, value2) {
    if (value1 != null) {
      this.setState({ checkin: value1 });
    }
    if (value2 != null) {
      this.setState({ checkout: value2 });
    }
  }

  saveGuests(value) {
    this.setState({ guestcount: value });
  }

  saveRoomType(value) {
    this.setState({ roomtype: value });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: "Clientes"
    });
  }

  async FavoriteStarClicked(data) {
    let userdetails = this.props.AllData.UserData;

    if (this.props.AllData.UserData != null) {
      var newheartids = this.props.AllData.favorite;

      if (this.props.AllData.favorite.includes(data.Apartment_Unit_Id)) {
        newheartids.splice(newheartids.indexOf(data.Apartment_Unit_Id), 1);
        Toast.show("Removed from Favorites.", Toast.LONG);
        const rese = await axios
          .post(
            `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/favorites/delete `,
            {
              unitId: data.Apartment_Unit_Id,
              userDetails: {
                userId: userdetails.userID,
                userName: userdetails.name,
                userEmail: userdetails.email,
                userContact: userdetails.phone_number
              }
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userdetails.idtoken
                // Token: userdata.accessToken
              } //refreshToken, idtoken,accessToken
            }
          )
          .then(({ data }) => {
            console.log(data);
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        newheartids.push(data.Apartment_Unit_Id);
        Toast.show("Saved to Favorites.", Toast.LONG);

        const res = await axios
          .post(
            `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/favorites/add`,
            {
              unitId: data.Apartment_Unit_Id,
              userDetails: {
                userId: userdetails.userID,
                userName: userdetails.name,
                userEmail: userdetails.email,
                userContact: userdetails.phone_number
              }
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userdetails.idtoken
                // Token: userdata.accessToken
              } //refreshToken, idtoken,accessToken
            }
          )
          .then(({ data }) => {
            console.log(data);
          })
          .catch(error => {
            console.log(error.response);
          });
      }
      this.props.AddFavorites(newheartids);
      this.setState({ heartnameids: newheartids });
    } else {
      // Toast.show("This is a toast.");
      Toast.show("Please log in to favorite apartments.", Toast.LONG);

      // this.props.screenProps.rootNavigation.navigate("Login");
      return;
    }
  }
  CheckExistName = hotelid => {
    if (this.props.AllData.favorite.includes(hotelid)) return "heart";
    else return "heart-o";
  };

  RenderMoreButton = () => {
    if (this.state.cards.length >= 4) {
      return (
        <Button
          title={"Show all (" + this.state.cards.length + "+)"}
          onclick
          titleStyle={styles.colorstyle}
          buttonStyle={styles.showallbutton}
          onPress={() => {
            this.props.AddGuestCount(this.state.guestcount);
            this.props.AddCheckin(this.state.checkin);
            this.props.AddCheckout(this.state.checkout);
            this.props.screenProps.rootNavigation.navigate("SearchResult", {
              City: "plano", //manual
              Pincode: this.state.pincode,
              FromDate: this.state.checkin,
              ToDate: this.state.checkout,
              Type: this.state.roomtype,
              checkin: this.state.checkin,
              checkout: this.state.checkout,
              guest: this.state.guestcount
            });
          }}
        />
      );
    }
  };
  render() {
    const {
      container,
      imageStyle,
      Headingtext,
      card,
      subcardImage,
      FirstTag,
      subTitle,
      SecondTag,
      ThridTag,
      subdistance,
      subreview,
      subprice,
      substatus,
      cardRatings,
      featuredlist,
      seeall
    } = styles;
    return (
      <ScrollView style={container} keyboardShouldPersistTaps="always">
        <View style={{ height: "5.35%", backgroundColor: "#f9f9f9" }} />
        <NavigationEvents
          onWillFocus={payload => {
            console.log(this.props.navigation);
          }}
        />
        <View style={{ backgroundColor: "#f9f9f9" }}>
          <View style={styles.heroimage}>
            <Image
              style={imageStyle}
              source={require("../../assets/homepage.png")}
            />
            <Text style={Headingtext}>
              Book your favorite apartments from {"\n"}anywhere and any place!
            </Text>
          </View>
          <View style={styles.searchplace}>
            <SearchCity
              place={this.state.showplace}
              navigation={this.props.navigation}
              savePlace={this.savePlace}
            />
          </View>
          <View style={styles.datepicker}>
            <DatePickerModal saveDate={this.saveDate} />
          </View>
          <View style={styles.roomguest}>
            <GuestsRoomtype
              saveGuests={this.saveGuests}
              saveRoomType={this.saveRoomType}
            />
          </View>
          <View style={styles.filter}>
            <Filter />
          </View>
          <Button
            title="Go"
            icon={
              <Icon
                name="location-arrow"
                type="font-awesome"
                color="#fff"
                size={18}
                style={styles.iconleft}
              />
            }
            onPress={() => {
              if (this.state.place == "" || this.state.place == null) {
                Toast.show("Please select the city.", Toast.LONG);

                return;
              }

              this.props.AddGuestCount(this.state.guestcount);
              this.props.AddCheckin(this.state.checkin);
              this.props.AddCheckout(this.state.checkout);
              this.props.screenProps.rootNavigation.navigate("SearchResult", {
                City: this.state.place,
                Pincode: this.state.pincode,
                FromDate: this.state.checkin,
                ToDate: this.state.checkout,
                Type: this.state.roomtype,
                checkin: this.state.checkin,
                checkout: this.state.checkout,
                guest: this.state.guestcount
              });
            }}
            buttonStyle={styles.button}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginVertical: 10
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "white",
              marginHorizontal: 12,
              marginTop: 10
            }}
          >
            {this.state.cards.length != 0 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={featuredlist}>Apartments in Plano</Text>
                <Text style={seeall}>see all</Text>
              </View>
            ) : (
              <View />
            )}
          </View>
          <ScrollView
            horizontal={true}
            style={{ flex: 1, backgroundColor: "white", marginHorizontal: 0 }}
          >
            {this.state.cards.map(items => (
              <TouchableWithoutFeedback
                key={items.Apartment_Unit_Id}
                onPress={() => {
                  this.props.screenProps.rootNavigation.navigate(
                    "Hoteldetails",
                    {
                      itemData: items,
                      checkin: this.state.checkin,
                      checkout: this.state.checkout,
                      HotelTitle: items.Apartment_Name,
                      guest: this.state.guestcount
                    }
                  );
                }}
                style={{ backgroundColor: "white", marginHorizontal: 5 }}
              >
                <View style={{ ...card, width: winWidth / 2.2 }}>
                  <Image
                    source={{ uri: items.Apartment_Image }}
                    style={subcardImage}
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
                      paddingHorizontal: 10,
                      paddingTop: 10
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#432355",
                          width: 150
                        }}
                      >
                        {commonFunc.trunctuateWord(items.Apartment_Name, 30)}
                      </Text>
                      <Text
                        style={{
                          marginBottom: 5,
                          fontSize: 12,
                          color: "#3d3d3d"
                        }}
                      >
                        Plano Texas
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
                          fontSize: 14,
                          color: "#432355"
                        }}
                      >
                        ${items.Apartment_Price_Per_Night}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5
                        }}
                      >
                        per night
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          {this.state.cards.length != 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                marginHorizontal: 12,
                flexDirection: "row"
              }}
            >
              <Text style={featuredlist}>Apartments in Dallas</Text>
            </View>
          ) : (
            <View />
          )}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
              marginBottom: 0,
              marginVertical: 10,
              flexDirection: "row"
            }}
          >
            {this.state.cards.slice(0, 2).map(items => (
              <TouchableOpacity
                key={items.Apartment_Unit_Id}
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.screenProps.rootNavigation.navigate(
                    "Hoteldetails",
                    {
                      itemData: items,
                      checkin: this.state.checkin,
                      checkout: this.state.checkout,
                      HotelTitle: items.Apartment_Name,
                      guest: this.state.guestcount
                    }
                  );
                }}
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    ...card,
                    width: winWidth / 2.2,
                    heigth: 200
                  }}
                >
                  <Image
                    source={{ uri: items.Apartment_Image }}
                    style={subcardImage}
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
                      paddingHorizontal: 10,
                      paddingTop: 10
                    }}
                  >
                    <View style={{ flex: 0.5, flexDirection: "column" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#432355",
                          width: 140
                        }}
                      >
                        {commonFunc.trunctuateWord(items.Apartment_Name, 30)}
                      </Text>
                      <Text
                        style={{
                          marginBottom: 5,
                          fontSize: 11,
                          color: "#3d3d3d",
                          width: 140
                        }}
                      >
                        {/* {items.Apartment__Nearest_Landmarks} */}
                        Plano Texas
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
                          fontSize: 13,
                          color: "#432355"
                        }}
                      >
                        ${items.Apartment_Price_Per_Night}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 5
                        }}
                      >
                        per night
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
              marginTop: 0,
              marginVertical: 10,
              flexDirection: "row"
            }}
          >
            {this.state.cards.slice(2, 4).map(items => (
              <TouchableOpacity
                key={items.Apartment_Unit_Id}
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.screenProps.rootNavigation.navigate(
                    "Hoteldetails",
                    {
                      itemData: items,
                      checkin: this.state.checkin,
                      checkout: this.state.checkout,
                      HotelTitle: items.Apartment_Name,
                      guest: this.state.guestcount
                    }
                  );
                }}
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    ...card,
                    width: winWidth / 2.2,
                    heigth: 200
                  }}
                >
                  <Image
                    source={{ uri: items.Apartment_Image }}
                    style={subcardImage}
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
                      paddingHorizontal: 10,
                      paddingTop: 10
                    }}
                  >
                    <View style={{ flex: 0.5, flexDirection: "column" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#432355",
                          width: 140
                        }}
                      >
                        {commonFunc.trunctuateWord(items.Apartment_Name, 30)}
                      </Text>
                      <Text
                        style={{
                          marginBottom: 5,
                          fontSize: 11,
                          color: "#3d3d3d",
                          width: 140
                        }}
                      >
                        {/* {items.Apartment__Nearest_Landmarks} */}
                        Plano Texas
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
                          fontSize: 13,
                          color: "#432355"
                        }}
                      >
                        ${items.Apartment_Price_Per_Night}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 5
                        }}
                      >
                        per night
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {this.RenderMoreButton()}
      </ScrollView>
    );
  }
}

var mapStateToProps = State => {
  return { AllData: State };
};

const ConnectComponent = connect(
  mapStateToProps,
  actions
)(Explore);
export { ConnectComponent as Explore };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  heroimage: {
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 2
  },
  Headingtext: {
    color: "#3d3d3d",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    marginBottom: 10,
    marginTop: 10
  },
  imageStyle: {
    alignItems: "center",
    marginBottom: 0,
    marginTop: 5
  },
  searchplace: {
    marginHorizontal: 40,
    marginBottom: 10
  },
  datepicker: {
    marginHorizontal: 40,
    marginBottom: 10
  },
  roomguest: {
    marginHorizontal: 40,
    marginBottom: 5
  },
  filter: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 48,
    marginHorizontal: 40,
    marginBottom: 15,
    marginTop: 5
  },
  showallbutton: {
    borderRadius: 17,
    marginHorizontal: 45,
    marginBottom: 15,
    height: 50,

    borderWidth: 1,
    borderColor: "#432355",
    backgroundColor: "transparent"
  },
  colorstyle: {
    color: "#432355"
  },
  button: {
    borderRadius: 19,
    marginHorizontal: 45,
    marginBottom: 15,
    height: 45,
    backgroundColor: "#432355"
  },
  iconleft: {
    marginRight: 10
  },
  featuredlist: {
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    color: "#000"
  },
  seeall: {
    fontSize: 14,
    color: "#000",
    fontFamily: "OpenSans-Regular",

    marginRight: 12
  },
  card: {
    flex: 1,
    overflow: "hidden",
    //borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 10
  },
  subcardImage: {
    flex: 1,
    width: "auto",
    height: 120,
    resizeMode: "cover",
    borderColor: "#ddd",
    borderRadius: 9
  },
  FirstTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    width: 200,
    marginVertical: 2
  },
  subTitle: {
    flex: 1,
    fontSize: 16,
    color: "#5b2fc6",
    fontWeight: "bold",
    flexDirection: "column",
    fontFamily: "OpenSans-Regular",

    marginRight: 5
  },
  subprice: {
    color: "#5b2fc6",
    fontWeight: "bold",
    flex: 3,
    position: "absolute",
    right: 0,
    top: 0
  },
  SecondTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 2
  },
  subdistance: {
    flex: 1,
    marginRight: 5,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  substatus: {
    flex: 3,
    fontSize: 12,
    position: "absolute",
    right: 0,
    fontFamily: "OpenSans-Regular",

    top: 0
  },
  ThridTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 2
  },
  cardRatings: {
    flex: 3,
    marginTop: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginBottom: 5
  },
  subreview: {
    flex: 3,
    position: "absolute",
    right: 0,
    top: 0,
    marginBottom: 5
  },
  selectedColor: {
    position: "absolute",
    right: 5,
    top: 5
  }
});
