import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import ImageHeaderextended from "../components/ImageHeaderextended";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as commonFunc from "../constants/commonFunctions";

import * as actions from "../actions";
import MapView, { UrlTile } from "react-native-maps";
import hoteldata from "../hoteldata";
const WonderWoman = {
  uri:
    "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/71/8a/77/hotel-exterior.jpg"
};

Image.prefetch(
  "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/71/8a/77/hotel-exterior.jpg"
);

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3.5;
const CARD_WIDTH = width - 65;
let searchResult = null;
var title = null;
class HotelMapView extends Component {
  state = {
    openIndex: null,
    render: false,
    show: false,
    overlayImage: false,
    coords: {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0)
    },
    transition: {},
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: WonderWoman
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: WonderWoman
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: WonderWoman
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: WonderWoman
      }
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068
    }
  };

  componentWillMount() {
    this.index = 0;
    this.images = {};
    this.animation = new Animated.Value(0);
    this.opacityAnimation = new Animated.Value(0);
    searchResult = this.props.AllData.Searchdata;
    title = this.props.navigation.getParam("title", null);
    searchResult = hoteldata;
    var markerCustom = [];
    if (searchResult != null) {
      for (i = 0; i < searchResult.length; i++) {
        markerCustom[i] = {
          coordinate: {
            latitude: parseFloat(searchResult[i].Apartment_Latitue),
            longitude: parseFloat(searchResult[i].Apartment_Longitude)
          },
          title: searchResult[i].Apartment_Name,
          //  description: "This is the best place in Portland",
          image: {
            uri: searchResult[i].Apartment_Image
          }
        };
      }
    }

    this.setState({ markers: markerCustom });
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  handleClose = () => {
    const { openIndex: index } = this.state;

    this.tImage.measure(
      (tframeX, tframeY, tframeWidth, tframeHeight, tpageX, tpageY) => {
        this.state.coords.top.setValue(tpageY);
        this.state.coords.left.setValue(tpageX);
        this.state.coords.width.setValue(tframeWidth);
        this.state.coords.height.setValue(tframeHeight);
        Animated.timing(this.opacityAnimation, {
          toValue: 0,
          duration: 100 // THIS SHOULD BE INTERPOLATION FROM X AND Y!
        }).start();

        this.setState(
          {
            overlayImage: true
          },
          () => {
            this.images[index].measure(
              (frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
                Animated.parallel([
                  Animated.timing(this.state.coords.top, {
                    toValue: pageY,
                    duration: 250
                  }),
                  Animated.timing(this.state.coords.left, {
                    toValue: pageX,
                    duration: 250
                  }),
                  Animated.timing(this.state.coords.width, {
                    toValue: frameWidth,
                    duration: 250
                  }),
                  Animated.timing(this.state.coords.height, {
                    toValue: frameHeight,
                    duration: 250
                  })
                ]).start(() => {
                  this.setState({
                    overlayImage: false,
                    render: false,
                    openIndex: null
                  });
                });
              }
            );
          }
        );
      }
    );
  };
  handleClickCards = index => {
    let datamap = this.state.markers[index];

    this.map.animateToRegion(
      {
        latitude: datamap.coordinate.latitude,
        longitude: datamap.coordinate.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta
      },
      350
    );
    this.props.navigation.navigate("Hoteldetails", {
      itemData: searchResult[index],
      HotelTitle: searchResult[index].Apartment_Name,
      checkin: this.props.AllData.CheckIn,
      checkout: this.props.AllData.CheckOut,
      HotelTitle: searchResult[index].Apartment_Name,
      guest: this.props.AllData.GuestCount
    });

    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: this.animation
            }
          }
        }
      ],
      { useNativeDriver: true }
    );
  };

  handleShow = index => {
    this.setState(
      {
        openIndex: index,
        render: true,
        transition: this.state.markers[index]
      },
      () => {
        this.images[index].measure(
          (frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
            this.state.coords.top.setValue(pageY);
            this.state.coords.left.setValue(pageX);
            this.state.coords.width.setValue(frameWidth);
            this.state.coords.height.setValue(frameHeight);
            this.setState(
              {
                overlayImage: true
              },
              () => {
                this.tImage.measure(
                  (
                    tframeX,
                    tframeY,
                    tframeWidth,
                    tframeHeight,
                    tpageX,
                    tpageY
                  ) => {
                    Animated.parallel([
                      Animated.timing(this.state.coords.top, {
                        toValue: tpageY,
                        duration: 250
                      }),
                      Animated.timing(this.state.coords.left, {
                        toValue: tpageX,
                        duration: 250
                      }),
                      Animated.timing(this.state.coords.width, {
                        toValue: tframeWidth,
                        duration: 250
                      }),
                      Animated.timing(this.state.coords.height, {
                        toValue: tframeHeight,
                        duration: 250
                      })
                    ]).start(() => {
                      this.opacityAnimation.setValue(1);
                      this.setState({
                        overlayImage: false
                      });
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  };

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH + 1
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                {/* <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#3d3d3d"
                  size={45}
                /> */}
                <TouchableOpacity
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */

                    this.props.navigation.navigate("Hoteldetails", {
                      itemData: searchResult[index],
                      HotelTitle: searchResult[index].Apartment_Name,
                      checkin: this.props.AllData.CheckIn,
                      checkout: this.props.AllData.CheckOut,
                      HotelTitle: searchResult[index].Apartment_Name,
                      guest: this.props.AllData.GuestCount
                    });
                  }}
                >
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    {/* <View style={styles.marker} /> */}

                    <Icon
                      name="map-marker"
                      type="font-awesome"
                      color="rgba(130,4,150, 0.9)"
                      size={45}
                    />
                  </Animated.View>
                </TouchableOpacity>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <TouchableOpacity
              key={searchResult[index].Apartment_Unit_Id}
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate("Hoteldetails", {
                  itemData: searchResult[index],
                  HotelTitle: searchResult[index].Apartment_Name,
                  checkin: this.props.AllData.CheckIn,
                  checkout: this.props.AllData.CheckOut,
                  HotelTitle: searchResult[index].Apartment_Name,
                  guest: this.props.AllData.GuestCount
                });
              }}
            >
              <View style={styles.cardnew}>
                <Image
                  source={{ uri: searchResult[index].Apartment_Image }}
                  style={styles.cardImagenew}
                />
                {/* <TouchableOpacity
                  key={searchResult[index].Apartment_Unit_Id}
                  style={styles.selectedColor}
                  onPress={() => {
                    this.FavoriteStarClicked(searchResult[index]);
                  }}
                >
                  <Icon
                    name={this.CheckExistName(
                      searchResult[index].Apartment_Unit_Id
                    )}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity> */}
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    paddingTop: 10
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#432355",
                        width: 250,
                        fontFamily: "OpenSans-Semibold"
                      }}
                    >
                      {commonFunc.trunctuateWord(
                        searchResult[index].Apartment_Name,
                        28
                      )}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 12,
                        color: "#3d3d3d"
                      }}
                    >
                      {searchResult[index].Apartment_Full_Address}
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
                      ${searchResult[index].Apartment_Price_Per_Night} per night
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
                        searchResult[index].Apartment__Nearest_Landmarks[
                          Object.keys(
                            searchResult[index].Apartment__Nearest_Landmarks
                          )[0]
                        ] +
                        " from " +
                        Object.keys(
                          searchResult[index].Apartment__Nearest_Landmarks
                        )[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
        {this.state.overlayImage && (
          <Animated.Image
            resizeMode="cover"
            style={{
              position: "absolute",
              top: this.state.coords.top,
              left: this.state.coords.left,
              width: this.state.coords.width,
              height: this.state.coords.height
            }}
            source={this.state.transition.image}
          />
        )}
        {this.state.render && (
          <Animated.View
            style={[
              styles.transitionContainer,
              StyleSheet.absoluteFill,
              { opacity: this.opacityAnimation }
            ]}
          >
            <TouchableOpacity onPress={this.handleClose}>
              <View>
                <Text>Close</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={this.state.transition.image}
              style={styles.transitionImage}
              ref={tImage => (this.tImage = tImage)}
              resizeMode="cover"
            />
            <View style={{ flex: 3 }}>
              <Text>{this.state.transition.title}</Text>
              <Text>{this.state.transition.description}</Text>
            </View>
          </Animated.View>
        )}
        <ImageHeaderextended
          navig={this.props.navigation}
          title={title}
          checkin={this.props.AllData.CheckIn}
          checkout={this.props.AllData.CheckOut}
          nextpage="Listview"
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
)(HotelMapView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height
  },
  hide: {
    opacity: 0
  },
  transitionContainer: {
    backgroundColor: "#FFF",
    padding: 10
  },
  transitionImage: {
    width: "100%",
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  cardnew: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "white",
    width: CARD_WIDTH,
    marginLeft: 23,
    marginRight: 23,
    borderColor: "rgba(158, 158, 158, 0.2)",
    borderRadius: 5,
    shadowColor: "#8e8e8e",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2
  },
  cardImagenew: {
    flex: 1,
    width: CARD_WIDTH,
    height: 170,
    resizeMode: "cover"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "OpenSans-Regular",
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    fontFamily: "OpenSans-Regular"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19
  },
  marker: {
    width: 25,
    height: 25,
    borderRadius: 19,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "transparent",
    position: "absolute",
    borderWidth: 1,
    borderColor: "transparent"
  }
});
