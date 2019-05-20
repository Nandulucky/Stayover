import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationEvents } from "react-navigation";

import { Button } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Iconsim from "react-native-vector-icons/SimpleLineIcons";
import * as commonFunc from "../../constants/commonFunctions";
import { FlatGrid } from "react-native-super-grid";
import MapView from "react-native-maps";
import ImageView from "react-native-image-view";
import PropTypes from "prop-types";
import ProductStyles from "./ProductStyle";
import Toast from "react-native-simple-toast";
import CommonDatePickerModal from "../popupsModal/commonModals/CommonDatePickerModal";
import Homeinfo from "../popupsModal/Homeinfo";
import hoteldata from "../../hoteldata";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";

const styles = StyleSheet.create({ ...ProductStyles });
const cards = hoteldata;
let hotelDetails = null;
let checkin = null;
let checkout = null;
const imagescollection = [];
let guest;

class HotelDetails extends Component {
  state = {
    isImageViewVisible: false,
    imageviewindex: 0,
    modalstart: false,
    modalhomeinfo: false,
    heartnameids: [],
    mainImage: ""
  };
  static defaultProps = {
    containerStyle: {}
  };

  constructor(props) {
    super(props);
    checkin = this.props.navigation.getParam("checkin", null);
    checkout = this.props.navigation.getParam("checkout", null);
    guest = this.props.navigation.getParam("guest", 2);
    heartnameids = this.props.AllData.favorite;
  }
  componentWillMount() {
    hotelDetails = this.props.navigation.getParam("itemData", null);
    this.setState({ mainImage: hotelDetails.Apartment_Image });
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
  setdateModalVisible = visible => {
    this.setState({ modalstart: visible });
  };

  setHomeModalVisible = visible => {
    this.setState({ modalhomeinfo: visible });
  };

  FavoriteStarClicked = data => {
    if (this.props.AllData.UserData != null) {
      var newheartids = this.props.AllData.favorite;

      if (this.props.AllData.favorite.includes(data.Apartment_Unit_Id)) {
        newheartids.splice(newheartids.indexOf(data.Apartment_Unit_Id), 1);
        Toast.show("Removed from Favorites.", Toast.LONG);
      } else {
        newheartids.push(data.Apartment_Unit_Id);
        Toast.show("Saved to Favorites.", Toast.LONG);
      }
      this.props.AllData.favorite = newheartids;
      this.props.AddFavorites(newheartids);
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
                marginLeft: 15,
                paddingTop: 8,
                color: "#fff",
                fontFamily: "OpenSans-Regular"
              }}
            >
              {commonFunc.trunctuateWord(hotelDetails.Apartment_Name, 25)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 15,
                color: "#fff",
                fontFamily: "OpenSans-Regular"
              }}
            >
              {this.formatDate(
                new Date(
                  this.props.AllData.CheckIn == null
                    ? checkin
                    : this.props.AllData.CheckIn
                )
              )}{" "}
              -{" "}
              {this.formatDate(
                new Date(
                  this.props.AllData.CheckOut == null
                    ? checkout
                    : this.props.AllData.CheckOut
                )
              )}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-end",
              flexBasis: "20%"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.FavoriteStarClicked(hotelDetails);
              }}
            >
              <Icon
                name={this.CheckExistName(hotelDetails.Apartment_Unit_Id)}
                color="#fff"
                style={{ fontSize: 25, paddingTop: 10, paddingRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  renderContactHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isImageViewVisible: true });
              //this.setState({ imageviewindex: index });
            }}
          >
            <ImageBackground
              source={{
                uri: this.state.mainImage
              }}
              style={styles.coverImage}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: "#fff", marginHorizontal: 0 }}
        >
          {hotelDetails.Apartment_List_Of_Images.map((items, index) => (
            <TouchableOpacity
              key={items}
              onPress={() => {
                this.setState({
                  mainImage: hotelDetails.Apartment_List_Of_Images[index],
                  imageviewindex: index
                });
              }}
              style={{
                backgroundColor: "#fff",
                marginHorizontal: 5,
                marginVertical: 10,
                marginBottom: 0
              }}
            >
              <View style={{ ...styles.card, marginHorizontal: 5 }}>
                <Image
                  source={{ uri: items }}
                  style={styles.subcardImagecarousal}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  renderDescription = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 18,
            color: "#432355",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          {commonFunc.trunctuateWord(hotelDetails.Apartment_Name, 35)}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 2 }}>
          <Icon
            name="map-marker"
            type="font-awesome"
            size={16}
            style={{ ...styles.iconleft, marginTop: 1 }}
          />
          <Text style={styles.descriptionText}>
            1 km from Union Square
            {/* {hotelDetails.Apartment__Nearest_Landmarks[0]} */}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#efefef",
            marginTop: 5
          }}
        />
      </View>
    );
  };

  renderNavigator = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          marginBottom: 15
        }}
      >
        <Text
          style={{ ...styles.navigatorText, fontFamily: "OpenSans-SemiBold" }}
        >
          {hotelDetails.Apartment_Max_Occupants} Guests
        </Text>
        <Text
          style={{
            ...styles.navigatorText,
            marginLeft: "10%",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          {hotelDetails.Apartment_BedRoom_Cnt} Bedroom
        </Text>

        <Text
          style={{
            ...styles.navigatorText,
            marginLeft: "10%",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          2 Bed
        </Text>

        <Text
          style={{
            ...styles.navigatorText,
            marginLeft: "10%",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          {hotelDetails.Apartment_BathRoom_Cnt} Bath
        </Text>
      </View>
    );
  };
  renderDetail = () => {
    hotelDetails.Apartment_List_Of_Images.map(item =>
      imagescollection.push({
        source: {
          uri: item
        },
        width: 806,
        height: 720
      })
    );
    return (
      <View style={{ marginVertical: 5 }}>
        {hotelDetails.Apartment_Desc == null ? (
          <Text style={{ ...styles.subDetailText, color: "#666666" }}>
            This property is 2 minutes walk from the beach. Located in Thoddoo,
            Thoddoo Beach Holiday Inn provides water sports facilities and free
            WiFi. Featuring a 24-hour front desk, this property also provides
            guests with a restaurant. The guesthouse has a shared lounge.{"\n"}
            {"\n"}
            Guest rooms in the guesthouse are equipped with a seating area, a
            flat-screen TV with satellite channels, a kitchen, a dining area and
            a private bathroom with free toiletries, a bath and a bidet. The
            rooms are equipped with air conditioning, and selected rooms also
            feature a balcony.
          </Text>
        ) : (
          <Text> {hotelDetails.Apartment_Desc}</Text>
        )}
        <Text
          style={{
            ...styles.subDetailText,
            color: "#666666",
            fontSize: 15,
            marginTop: 5
          }}
        >
          1 Night minimum stay
        </Text>
        <Text
          style={{
            ...styles.subDetailText,
            color: "#666666",
            fontWeight: "500"
          }}
        >
          Check-in time is 2PM - 8PM and check out by noon.
        </Text>
      </View>
    );
  };

  renderAmenities = () => {
    //this.setState({ hotelDetails: hotelDetails });
    const mainaminities = {
      name: "Property Amenities",
      id: 0,
      children: []
    };

    if (hotelDetails.Apartment_Amenities["Conference Room"] == "Yes") {
      mainaminities.children.push({
        name: "Conference Room",
        id: 4,
        icon: (
          <Image
            source={require("../../assets/amenities/conferenceroom.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Balcony"] == "Yes") {
      mainaminities.children.push({
        name: "Balcony",
        id: 8,
        icon: (
          <Image
            source={require("../../assets/amenities/balcony.png")}
            style={styles.iconImage}
          />
        )
      });
    }
    if (hotelDetails.Apartment_Amenities["Washer/Dryer"] == "Yes") {
      mainaminities.children.push({
        name: "Washer/Dryer\n",
        id: 1,
        icon: (
          <Image
            source={require("../../assets/amenities/washer.png")}
            style={styles.iconImage}
          />
        )
      });
    }
    if (hotelDetails.Apartment_Amenities["Floor Type"] == "Hardwood") {
      mainaminities.children.push({
        name: "Hardwood Floor",
        id: 11,
        icon: (
          <Image
            source={require("../../assets/amenities/hardwoodfloor.png")}
            style={styles.iconImage}
          />
        )
      });
    }
    if (hotelDetails.Apartment_Amenities["Swimming Pool"] == "Yes") {
      mainaminities.children.push({
        name: "Swimming Pool",
        id: 11,
        icon: (
          <Image
            source={require("../../assets/amenities/hardwoodfloor.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Dishwasher"] == "Yes") {
      mainaminities.children.push({
        name: "Dishwasher\n",
        id: 9,
        icon: (
          <Image
            source={require("../../assets/amenities/dishwasher.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Pets Allowed"] == "Yes") {
      mainaminities.children.push({
        name: "Pets Allowed",
        id: 6,
        icon: (
          <Image
            source={require("../../assets/amenities/pets.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Air Conditioning"] == "Yes") {
      mainaminities.children.push({
        name: "Air Conditioning",
        id: 10,
        icon: (
          <Image
            source={require("../../assets/amenities/aircondition.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Parking Type"] == "Attached Garage") {
      mainaminities.children.push({
        name: "Garage Parking",
        id: 5,
        icon: (
          <Image
            source={require("../../assets/amenities/garageparking.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Fitness Center"] == "Yes") {
      mainaminities.children.push({
        name: "fitness Center\n",
        id: 2,
        icon: (
          <Image
            source={require("../../assets/amenities/fitness.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Mailroom"] == "Yes") {
      mainaminities.children.push({
        name: "Mailroom\n",
        id: 3,
        icon: (
          <Image
            source={require("../../assets/amenities/mailroom.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Amenities["Patio"] == "Yes") {
      mainaminities.children.push({
        name: "Patio\n",
        id: 7,
        icon: (
          <Image
            source={require("../../assets/amenities/patio.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    const businessaminities = {
      name: "Business Travel Ameneties",
      id: 12,
      children: []
    };

    if (hotelDetails.Apartment_Business_Amenities["Full Kitchen"] == "Yes") {
      businessaminities.children.push({
        name: "Full Kitchen\n",
        id: 13,
        icon: (
          <Image
            source={require("../../assets/amenities/fullkitchen.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Business_Amenities["Coffe Machine"] == "Yes") {
      businessaminities.children.push({
        name: "Coffee Machine",
        id: 14,
        icon: (
          <Image
            source={require("../../assets/amenities/coffeemachine.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Business_Amenities["Iron"] == "Yes") {
      businessaminities.children.push({
        name: "Iron\n",
        id: 15,
        icon: (
          <Image
            source={require("../../assets/amenities/iron.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (
      hotelDetails.Apartment_Business_Amenities["High Speed Internet"] == "Yes"
    ) {
      businessaminities.children.push({
        name: "High Speed Internet",
        id: 16,
        icon: (
          <Image
            source={require("../../assets/amenities/wifi.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Business_Amenities["Cable"] == "Yes") {
      businessaminities.children.push({
        name: "Cable\n",
        id: 17,
        icon: (
          <Image
            source={require("../../assets/amenities/cable.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    if (hotelDetails.Apartment_Business_Amenities["Smart TV"] == "Yes") {
      businessaminities.children.push({
        name: "Smart TV\n",
        id: 18,
        icon: (
          <Image
            source={require("../../assets/amenities/smarttv.png")}
            style={styles.iconImage}
          />
        )
      });
    }

    const propertyitem = [mainaminities, businessaminities];

    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#efefef",
          marginTop: 8,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            ...styles.detailText,
            marginTop: 10,
            color: "#3d3d3d",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          Amenities
        </Text>

        {propertyitem.map(newitem => (
          <ScrollView key={newitem.id}>
            <Collapse isCollapsed={true}>
              <CollapseHeader>
                <View
                  style={{
                    flexDirection: "row",
                    color: "#432355",
                    backgroundColor: "#efefef",
                    padding: 10,
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#432355",
                        fontFamily: "OpenSans-Regular"
                      }}
                    >
                      {newitem.name}
                    </Text>

                    {/* <Iconsim
                      name="arrow-right"
                      style={{
                        ...styles.detailText,

                        color: "#432355"
                      }}
                    /> */}
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <FlatGrid
                    itemDimension={70}
                    items={newitem.children}
                    renderItem={({ item }) => (
                      <View key={item.id}>
                        <Button
                          buttonStyle={{ backgroundColor: "white" }}
                          icon={item.icon}
                        />
                        <Text style={{ textAlign: "center", fontSize: 12 }}>
                          {item.name}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </CollapseBody>
            </Collapse>
          </ScrollView>
        ))}
      </View>
    );
  };
  renderServices = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#efefef",
          marginTop: 10,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            ...styles.detailText,
            marginTop: 10,
            color: "#3d3d3d",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          Services
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10
          }}
        >
          {hotelDetails.Apartment_Services.Housekeeping == "Yes" ? (
            <Text>House Keeping</Text>
          ) : (
            <Text />
          )}
          {hotelDetails.Apartment_Services.Drycleaning == "Yes" ? (
            <Text>Drycleaning</Text>
          ) : (
            <Text />
          )}
          {hotelDetails.Apartment_Services.Breakfast == "Yes" ? (
            <Text>Breakfast</Text>
          ) : (
            <Text />
          )}
          {hotelDetails.Apartment_Services["Uber/Lyft"] == "Yes" ? (
            <Text>Uber/Lyft</Text>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  };
  renderAvailability = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#efefef",
          marginTop: 10,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            ...styles.detailText,
            marginTop: 10,
            color: "#3d3d3d",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          Availability
        </Text>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalstart: true });
            }}
          >
            <Text style={{ color: "#432355", textDecorationLine: "underline" }}>
              Show full Calender
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderLocation = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#efefef",
          marginTop: 10,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            ...styles.detailText,
            marginTop: 10,
            color: "#3d3d3d",
            fontFamily: "OpenSans-SemiBold"
          }}
        >
          Location
        </Text>
        <Text style={{ color: "#3d3d3d" }}>
          This property is located in
          {/* {hotelDetails.Apartment_Latitue} */}
        </Text>
        <View
          style={{
            paddingHorizontal: 5,
            marginTop: 8,
            marginBottom: 10,
            borderRadius: 20,
            overflow: "hidden"
          }}
        >
          <MapView
            initialRegion={{
              latitude: parseFloat(hotelDetails.Apartment_Latitue),
              longitude: parseFloat(hotelDetails.Apartment_Longitude),
              latitudeDelta: 1,
              longitudeDelta: 1
            }}
            style={{
              flex: 0.5,
              width: "100%",
              height: 260,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 20
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(hotelDetails.Apartment_Latitue),
                longitude: parseFloat(hotelDetails.Apartment_Longitude)
              }}
            />
          </MapView>
        </View>
      </View>
    );
  };
  renderHouserules = () => {
    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <View>
          <Text
            style={{
              ...styles.detailText,
              color: "#3d3d3d",
              fontFamily: "OpenSans-SemiBold"
            }}
          >
            Cancellation Policy and House Rules
          </Text>
          <Text>
            Strict - Cancel within 48hrs of booking and at least 14 days prior
            to check-in to get a full refund.{"\n\n"}After that, cancel up to 5
            days before check-in and the nights are refundable, but the service
            fee isn’t.
          </Text>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => {
              this.setState({ modalhomeinfo: true });
              //this.setState({ imageviewindex: index });
            }}
          >
            <Text
              style={{
                color: "#432355",
                fontFamily: "OpenSans-SamiBold",
                textDecorationLine: "underline",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              Read all policies and house rules
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderAdditionalcharge = () => {
    return (
      <View
        style={{
          marginTop: 10,
          marginBottom: 5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text
              style={{
                ...styles.detailText,
                color: "#3d3d3d",
                marginTop: 10,
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              Additional Charges
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: "column",
              alignItems: "flex-end"
            }}
          >
            {/* <Iconsim
                  name="arrow-right"
                  style={{
                    //...styles.detailText,
                    marginTop: 10,
                    color: "#432355"
                  }}
                /> */}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 5
          }}
        >
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Text>Service Fee </Text>
            <Text
              style={{
                marginLeft: "40%"
              }}
            >
              ${(125 * parseFloat(8)) / 100}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Text>Cleaning Fee </Text>
            <Text
              style={{
                marginLeft: "37.5%"
              }}
            >
              $40
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-end"
            }}
          />
        </View>
      </View>
    );
  };
  renderContacthost = () => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#efefef",
          marginTop: 10,
          marginBottom: 5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text
              style={{
                ...styles.detailText,
                marginTop: 10,
                color: "#3d3d3d",
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              Contact Host
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: "column",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={{
                ...styles.detailText,
                marginTop: 10,
                color: "#432355",
                fontSize: 14
              }}
            >
              +1 (123) 456-789
            </Text>
          </View>
        </View>
      </View>
    );
  };

  saveDate = (value1, value2) => {
    if (value1 != null) {
      this.props.AddCheckin(value1);
    }
    if (value2 != null) {
      this.props.AddCheckout(value2);
    }
  };
  renderSimilarhome = () => {
    return (
      <View
        style={{
          marginTop: 15,
          marginBottom: 15
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text
              style={{
                ...styles.detailText,
                color: "#432355",
                fontSize: 18,
                fontFamily: "OpenSans-SemiBold"
              }}
            >
              Similar Properties
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: "column",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={{
                ...styles.detailText,
                marginTop: 10,
                color: "#432355",
                fontSize: 12
              }}
            >
              See all
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 0,
            marginBottom: 5
          }}
        >
          {cards.map(items => (
            <TouchableOpacity
              key={items.Apartment_Unit_Id}
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.goBack();
                this.props.navigation.push("Hoteldetails", {
                  itemData: items,
                  HotelTitle: items.Apartment_Name,
                  checkin: checkin,
                  checkout: checkout,
                  HotelTitle: items.Apartment_Name,
                  guest: guest
                });
              }}
            >
              <View style={{ ...styles.card, width: 200 }}>
                <Image
                  source={{ uri: items.Apartment_Image }}
                  style={{ ...styles.subcardImage }}
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
                      {commonFunc.trunctuateWord(items.Apartment_Name, 20)}
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
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.mainviewStyle}>
            <View style={{height:"5.35%",backgroundColor: "#432355" }}  />

        <NavigationEvents
          //onWillFocus={payload => console.log("will focus him", payload)}
          onDidFocus={() => {
            this.props.AddHotelData(null);
          }}
          // onWillBlur={payload => console.log("will blur him", payload)}
          // onDidBlur={payload => console.log("did blur him", payload)}
        />
        {this.renderHeader()}
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>

          <View style={styles.productRow}>{this.renderNavigator()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
          <View style={styles.productRow}>{this.renderAmenities()}</View>
          <View style={styles.productRow}>{this.renderServices()}</View>
          <View style={styles.productRow}>{this.renderAvailability()}</View>
          <View style={styles.productRow}>{this.renderLocation()}</View>
          <View style={styles.productRow}>{this.renderHouserules()}</View>
          <View style={styles.productRow}>{this.renderAdditionalcharge()}</View>
          <View style={styles.productRow}>{this.renderContacthost()}</View>
          <View style={styles.productRow}>{this.renderSimilarhome()}</View>
        </ScrollView>
        <TouchableOpacity
          style={styles.Detailfooter}
          onPress={() => {
            this.props.AddHotelData(hotelDetails);
            this.props.AddCheckin(
              this.props.AllData.CheckIn == null
                ? checkin
                : this.props.AllData.CheckIn
            );
            this.props.AddCheckout(
              this.props.AllData.CheckOut == null
                ? checkout
                : this.props.AllData.CheckOut
            );
            this.props.AddGuestCount(guest);
            this.props.navigation.navigate("PreviewBookingDetails");
          }}
        >
          <View style={styles.detailbuttonFooter}>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  color: "#432355",
                  fontSize: 20,
                  fontFamily: "OpenSans-SemiBold",
                  paddingTop: 0,
                  marginLeft: "30%"
                }}
              >
                ${hotelDetails.Apartment_Price_Per_Night}{" "}
              </Text>
              <Text
                style={{
                  color: "#3d3d3d",
                  paddingTop: 5,
                  fontFamily: "OpenSans-Regular",
                  fontSize: 16
                }}
              >
                /Night
              </Text>
            </View>
          </View>
          <View style={styles.buttonFooter}>
            <Text style={styles.DetailtextFooter}>Book</Text>
          </View>
        </TouchableOpacity>
        <ImageView
          images={imagescollection}
          isVisible={this.state.isImageViewVisible}
          imageIndex={this.state.imageviewindex}
          onClose={() => {
            this.setState({ isImageViewVisible: false });
          }}
        />
        <CommonDatePickerModal
          saveDate={this.saveDate}
          setDateModalVisible={this.setdateModalVisible}
          modalstart={this.state.modalstart}
          allowSelection={true}
        />
        <Homeinfo
          setHomeDataModalVisible={this.setHomeModalVisible}
          modalhomeinfo={this.state.modalhomeinfo}
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
)(HotelDetails);
