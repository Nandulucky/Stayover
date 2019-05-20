import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import * as actions from "../../actions";
import ImageHeader from "../ImageHeader";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import axios from "axios";
import { Spinner } from "../common";
import Swipeable from "react-native-swipeable-row";
const winHeight = Dimensions.get("window").height;
import * as commonFunc from "../../constants/commonFunctions";
import { NavigationEvents } from "react-navigation";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
Amplify.configure(awsConfig);
const winWidth = Dimensions.get("window").width;
let userdetails = null;
let guest = 0;

class Trips extends React.Component {
  constructor(props) {
    super(props);
    guest = this.props.AllData.GuestCount;

    userdetails = this.props.AllData.UserData;
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
  GetSlideData = items => {
    return [
      <TouchableOpacity
        onPress={() => {
          this.props.AddHotelData(items.Booking_Property_Details);
          this.props.AddCheckin(new Date(items.Booking_From_Date));
          this.props.AddCheckout(new Date(items.Booking_To_Date));
          this.props.AddGuestCount(
            items.Total_Guests == null ? 1 : items.Total_Guests
          );

          this.props.screenProps.rootNavigation.navigate(
            "PreviewBookingDetails",
            {
              modifyBooking: true,
              PreviewBookingTitle: "View details",
              Final_Total: items.Booking_Total_Price
            }
          );
        }}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.AddHotelData(items.Booking_Property_Details);
            this.props.AddCheckin(new Date(items.Booking_From_Date));
            this.props.AddCheckout(new Date(items.Booking_To_Date));
            this.props.AddGuestCount(
              items.Total_Guests == null ? 1 : items.Total_Guests
            );

            this.props.screenProps.rootNavigation.navigate(
              "PreviewBookingDetails",
              {
                modifyBooking: true,
                PreviewBookingTitle: "View details",
                Final_Total: items.Booking_Total_Price
              }
            );
          }}
          style={{
            flexDirection: "column"
          }}
        >
          <Text
            style={{
              marginHorizontal: 5,
              marginRight: 20,
              marginTop: 15,
              paddingRight: 15,
              fontSize: 16,
              color: "#432355",
              fontFamily: "OpenSans-SemiBold"
            }}
          >
            {commonFunc.trunctuateWord(items.Apartment_Name, 28)}
          </Text>
          {items.Apartment_Unit_Id == "cancelledbook" ? (
            <Text
              style={{
                fontSize: 14,
                marginHorizontal: 5,
                color: "red",
                fontFamily: "OpenSans-Regular",
                marginBottom: 7
              }}
            >
              Cancelled Booking
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flexDirection: "column"
              }}
            >
              <Text
                style={{
                  marginHorizontal: 5,
                  marginBottom: 5,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Booked Date
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  marginRight: 20,
                  marginVertical: 0,
                  paddingRight: 15,
                  fontSize: 12,
                  color: "#432355",
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                {this.formatDate(items.Booking_From_Date)}
                {" - "}
                {this.formatDate(items.Booking_To_Date)}
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  marginRight: 20,
                  marginTop: 10,
                  marginBottom: 0,
                  paddingRight: 15,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Total Amount
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  marginTop: 0,
                  marginBottom: 5,
                  fontSize: 12,
                  color: "#432355",
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                ${items.Booking_Total_Price}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginRight: "65%"
              }}
            >
              <Text
                style={{
                  marginHorizontal: 5,
                  marginLeft: 5,
                  marginBottom: 5,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                Guests
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginVertical: 0,
                  fontSize: 12,
                  color: "#432355",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                {items.Total_Guests}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 0,
                  marginBottom: 0,
                  fontSize: 14,
                  fontFamily: "OpenSans-SemiBold"
                }}
              />

              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  marginTop: 5,
                  fontFamily: "OpenSans-SemiBold"
                }}
              >
                View Details..
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>,
      <TouchableHighlight
        style={{
          flex: 0.7,
          width: "10%"
        }}
      >
        <Text />
      </TouchableHighlight>,
      <TouchableHighlight
        style={{
          flex: 0.7,
          width: "10%"
        }}
      >
        <Text />
      </TouchableHighlight>
    ];
  };

  state = { isLoading: false, cards: [] };
  componentDidMount() {
    if (this.props.CurrentPage != null) this.props.CurrentPage(null);
  }
  async GetTrips() {
    // console.log(userdetails.accessToken);
    if (userdetails == null) {
      this.setState({ isLoading: false });

      return;
    }
    const res = await axios

      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/trips`,
        {
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
            Authorization: "Bearer " + userdetails.idtoken,
            Token: userdetails.accessToken
          } //refreshToken, idtoken,accessToken
        }
      )
      .then(({ data }) => {
        console.log(data);
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
  async loadData() {
    userdetails = this.props.AllData.UserData;

    this.setState({
      isLoading: true
    });
    Auth.currentSession()
      .then(data => {
        console.log(data);
        (userdetails.accessToken = data.accessToken.jwtToken),
          (userdetails.idtoken = data.idToken.jwtToken);
        this.props.AddHotelData(null);

        this.GetTrips();
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  renderSpinner = () => {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  };

  renderMainData = () => {
    const {
      maincontainer,
      card,
      subcardImage,
      FirstTag,
      viewdetail,
      subprice,
      cardhistoryImage,
      container,
      overlay
    } = styles;
    if (this.state.cards.length == 0) {
      return (
        <View style={{ flex: 1, alignContent: "space-between", top: "5%" }}>
          <Text
            style={{
              fontSize: 21,
              fontFamily: "OpenSans-Bold",
              color: "#432355",
              textAlign: "center"
            }}
          >
            Where to?
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: "20%",
              marginBottom: 5
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "OpenSans-Regular",
                color: "#3d3d3d",
                textAlign: "center"
              }}
            >
              Start planning your first trip on Stayovr
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../../assets/trips1.png")}
              style={styles.imageHead}
            />
          </View>
          <View>
            <Button
              title="Explore Stayovr"
              color="#841584"
              onPress={() => {
                this.props.navigation.navigate("Explore");
              }}
              buttonStyle={styles.bigbutton}
              titleStyle={{
                color: "#432355",
                fontSize: 18,
                fontFamily: "OpenSans-Bold"
              }}
            />
          </View>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: 16,
              fontFamily: "OpenSans-SemiBold",
              color: "#3d3d3d"
            }}
          >
            Current Trip
          </Text>
          {this.state.cards.slice(0, 1).map(items => (
            <TouchableOpacity
              onPress={() => {
                this.props.AddHotelData(items.Booking_Property_Details);
                this.props.AddCheckin(new Date(items.Booking_From_Date));
                this.props.AddCheckout(new Date(items.Booking_To_Date));
                this.props.AddGuestCount(
                  items.Total_Guests == null ? 1 : items.Total_Guests
                );

                this.props.screenProps.rootNavigation.navigate(
                  "PreviewBookingDetails",
                  {
                    modifyBooking: true,
                    PreviewBookingTitle: "View details",
                    Final_Total: items.Booking_Total_Price
                  }
                );
              }}
              style={card}
              key={items.Booking_Id}
            >
              <Image
                source={{
                  uri: items.Booking_Property_Details.Apartment_Image
                }}
                style={subcardImage}
              />
              <View style={{ flexDirection: "row", margin: 10 }}>
                <View style={styles.checkinedit}>
                  <Text style={styles.datalabel}>Check-in</Text>
                  <Text style={styles.showvalue}>
                    {this.formatDate(items.Booking_From_Date)}
                  </Text>
                </View>
                <View style={styles.checkoutedit}>
                  <Text style={styles.datalabel}>Check-out</Text>
                  <Text style={styles.showvalue}>
                    {this.formatDate(items.Booking_To_Date)}
                  </Text>
                </View>
                <View style={styles.checkguests}>
                  <Text style={styles.datalabel}>Guests</Text>
                  <Text style={styles.showvalue}>
                    {items.Total_Guests} Guests
                  </Text>
                </View>
              </View>
              <View style={FirstTag}>
                <Text style={subprice}>
                  {commonFunc.trunctuateWord(items.Apartment_Name, 28)}
                </Text>
                <Text style={viewdetail}>View Details..</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View
            style={{
              marginTop: 15,
              marginHorizontal: 12,
              borderTopWidth: 1,
              borderTopColor: "#efefef"
            }}
          />
          <Text
            style={{
              marginHorizontal: 12,
              marginTop: 10,
              fontSize: 16,
              fontFamily: "OpenSans-SemiBold",
              color: "#3d3d3d"
            }}
          >
            Trips coming up
          </Text>
          {this.state.cards.slice(0, 3).map(items => (
            <TouchableOpacity
              onPress={() => {
                this.props.AddHotelData(items.Booking_Property_Details);
                this.props.AddCheckin(new Date(items.Booking_From_Date));
                this.props.AddCheckout(new Date(items.Booking_To_Date));
                this.props.AddGuestCount(
                  items.Total_Guests == null ? 1 : items.Total_Guests
                );

                this.props.screenProps.rootNavigation.navigate(
                  "PreviewBookingDetails",
                  {
                    modifyBooking: true,
                    PreviewBookingTitle: "View details",
                    Final_Total: items.Booking_Total_Price
                  }
                );
              }}
              style={card}
              key={items.Booking_Id}
            >
              <Image
                source={{
                  uri: items.Booking_Property_Details.Apartment_Image
                }}
                style={subcardImage}
              />
              <View style={{ flexDirection: "row", margin: 10 }}>
                <View style={styles.checkinedit}>
                  <Text style={styles.datalabel}>Check-in</Text>
                  <Text style={styles.showvalue}>
                    {this.formatDate(items.Booking_From_Date)}
                  </Text>
                </View>
                <View style={styles.checkoutedit}>
                  <Text style={styles.datalabel}>Check-out</Text>
                  <Text style={styles.showvalue}>
                    {this.formatDate(items.Booking_To_Date)}
                  </Text>
                </View>
                <View style={styles.checkguests}>
                  <Text style={styles.datalabel}>Guests</Text>
                  <Text style={styles.showvalue}>
                    {items.Total_Guests} Guests
                  </Text>
                </View>
              </View>
              <View style={FirstTag}>
                <Text style={subprice}>
                  {commonFunc.trunctuateWord(items.Apartment_Name, 28)}
                </Text>

                <Text style={viewdetail}>View Details..</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View
            style={{
              marginTop: 15,
              marginHorizontal: 12,
              borderTopWidth: 1,
              borderTopColor: "#efefef"
            }}
          />
          <Text
            style={{
              marginHorizontal: 12,
              marginTop: 10,
              fontSize: 16,
              fontFamily: "OpenSans-SemiBold",
              color: "#3d3d3d"
            }}
          >
            History
          </Text>
          {this.state.cards.map(items => (
            <View style={{ ...card }} key={items.Booking_Id}>
              <Swipeable rightButtons={this.GetSlideData(items)}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{
                      uri: items.Booking_Property_Details.Apartment_Image
                    }}
                    style={cardhistoryImage}
                  />

                  {items.Apartment_Unit_Id == "cancelledbook" ? (
                    <View
                      style={{
                        ...overlay,
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "OpenSans-SemiBold",
                          fontSize: 20,
                          color: "red"
                        }}
                      >
                        Cancelled
                      </Text>
                    </View>
                  ) : null}
                </View>
              </Swipeable>
            </View>
          ))}
        </ScrollView>
      );
    }
  };
  render() {
    const {
      maincontainer,
      card,
      subcardImage,
      FirstTag,
      viewdetail,
      subprice,
      cardhistoryImage,
      container,
      overlay
    } = styles;
    return (
      <View style={maincontainer}>
        <NavigationEvents
          //onWillFocus={payload => console.log("will focus him", payload)}
          onDidFocus={() => {
            this.loadData();
          }}
          // onWillBlur={payload => console.log("will blur him", payload)}
          // onDidBlur={payload => console.log("did blur him", payload)}
        />
        <View style={{ ...container, marginBottom: "10%", marginTop: "10%" }}>
          {this.renderMainData()}
        </View>

        {this.renderSpinner()}
        <ImageHeader title="My Trips" />
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
)(Trips);
export { ConnectComponent as Trips };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: "10%",
    marginHorizontal: 20
  },
  maincontainer: {
    flex: 1,
    flexDirection: "column",
    position: "relative"
  },
  card: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(158, 158, 158, 0.2)",
    borderRadius: 5
  },
  subcardImage: {
    flex: 1,
    height: 120,
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  FirstTag: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 8
  },
  subprice: {
    flex: 1,
    marginRight: 5,
    fontSize: 16,
    color: "#432355",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexDirection: "column",
    fontFamily: "OpenSans-SemiBold"
  },
  viewdetail: {
    flex: 3,
    fontSize: 12,
    position: "absolute",
    right: 0,
    top: 3,
    fontFamily: "OpenSans-Regular"
  },
  checkinedit: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  checkoutedit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  checkguests: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  datalabel: {
    color: "#636464",
    fontSize: 14,
    fontFamily: "OpenSans-Regular"
  },
  showvalue: {
    fontSize: 17,
    fontFamily: "OpenSans-Regular",
    color: "#3d3d3d"
  },
  cardhistoryImage: {
    flex: 1,
    borderRadius: 10,
    height: 160,
    width: "auto",
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  bigbutton: {
    borderRadius: 19,
    marginHorizontal: "23%",
    height: 45,
    backgroundColor: "#fff200"
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: "30%",
    opacity: 0.7,
    backgroundColor: "white",
    width: "100%"
  },
  imageHead: {
    width: winWidth / 1.5,
    height: winHeight / 3,
    borderRadius: 5,
    resizeMode: "stretch",
    marginBottom: "8%",
    marginTop: "12%"
  }
});
