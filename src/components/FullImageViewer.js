import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";

class FullImageviewer extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const hotelDetails = this.props.navigation.getParam("itemData", "null");

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#fff", marginHorizontal: 0 }}
      >
        {hotelDetails.map(items => (
          <TouchableOpacity
            key={items.property_id}
            onPress={() => {}}
            style={{ backgroundColor: "#fff", marginHorizontal: 5 }}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: items.property_image }}
                style={styles.subcardImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default FullImageviewer;

const styles = StyleSheet.create({
  container: {
    marginTop: "2%"
  },
  subcardImage: {
    flex: 1,
    width: 500,
    resizeMode: "cover",
    borderColor: "#ddd"
  },
  card: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    margin: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});
