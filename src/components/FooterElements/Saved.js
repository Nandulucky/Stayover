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
import ImageHeader from "../ImageHeader";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as commonFunc from "../../constants/commonFunctions";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { Spinner } from "../common";

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

class Saved extends React.Component {
  state = { cards: [], isLoading: false, heartnameids: [] };

  constructor(props) {
    super(props);
    heartnameids = this.props.AllData.favorite;
  }
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
      this.props.AddFavorites(newheartids);
      this.setState({ heartnameids: newheartids });
    } else {
      // Toast.show("This is a toast.");
      Toast.show("Please log in to favorite apartments.", Toast.LONG);

      // this.props.screenProps.rootNavigation.navigate("Login");
      return;
    }
  };

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
  CheckExistName = hotelid => {
    if (this.props.AllData.favorite.includes(hotelid)) return "heart";
    else return "heart-o";
  };

  async componentWillMount() {
    this.setState({
      isLoading: true
    });
    const userdata = this.props.AllData.UserData;

    const res = await axios
      .post(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/favorites/details`,
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

        this.setState({
          cards: data.items
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ isLoading: false });
      });
  }

  renderSpinner = () => {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  };

  render() {
    const {
      maincontainer,
      card,
      subcardImage,
      selectedColor,
      container
    } = styles;
    return (
      <View style={maincontainer}>
        <Text
          style={{
            marginTop: "23%",
            marginHorizontal: 20,
            fontSize: 18,
            color: "#3d3d3d"
          }}
        >
          {this.state.cards.length} properties marked as Favorite
        </Text>
        <View style={container}>
          <ScrollView>
            {this.state.cards.map(items => (
              <TouchableOpacity
                key={items.Apartment_Unit_Id}
                onPress={() => {
                  this.props.screenProps.rootNavigation.navigate(
                    "Hoteldetails",
                    {
                      itemData: items,
                      HotelTitle: items.Apartment_Name,
                      checkin: this.props.AllData.CheckIn,
                      checkout: this.props.AllData.CheckOut,
                      guest: this.props.AllData.GuestCount
                    }
                  );
                }}
                style={{ backgroundColor: "#fff", marginHorizontal: 5 }}
              >
                <View style={card}>
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
                      paddingVertical: 15,
                      paddingTop: 10
                    }}
                  >
                    <View
                      style={{ flex: 1, flexDirection: "column", marginTop: 5 }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#432355",
                          fontFamily: "OpenSans-SemiBold"
                        }}
                      >
                        {commonFunc.trunctuateWord(items.Apartment_Name, 30)}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 5
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#432355",
                            fontFamily: "OpenSans-SemiBold"
                          }}
                        >
                          ${items.Apartment_Price_Per_Night}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#3d3d3d"
                          }}
                        >
                          {this.formatDate(new Date())}-
                          {this.formatDate(
                            new Date(
                              new Date().setDate(new Date().getDate() + 3) //add days
                            ).toDateString()
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#3d3d3d"
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: "column",
                        marginBottom: 5,
                        marginTop: 5
                      }}
                    >
                      <Button
                        title="Book"
                        titleStyle={styles.colorstyle}
                        buttonStyle={styles.showallbutton}
                        onPress={() => {
                          this.props.AddHotelData(items);

                          this.props.screenProps.rootNavigation.navigate(
                            "PreviewBookingDetails"
                          );
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {this.renderSpinner()}
        <ImageHeader title="Favorites" />
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
)(Saved);
export { ConnectComponent as Saved };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "0%"
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
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd"
  },
  subcardImage: {
    flex: 1,
    width: "auto",
    height: 150,
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  showallbutton: {
    borderRadius: 19,
    height: 40,
    width: "100%",
    backgroundColor: "#fff200"
  },
  colorstyle: {
    color: "#3d3d3d"
  },
  selectedColor: {
    position: "absolute",
    right: 5,
    top: 5
  }
});
