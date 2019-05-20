import React, { Component } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { ListItem } from "react-native-elements";

export default class CitySuggestion extends Component {
  constructor(props) {
    super(props);
    this.Citysave = this.Citysave.bind(this);
  }
  Citysave(showval, pincode, City) {
    this.props.savePlaces(showval, pincode, City);
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={true}
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <FlatList
          keyboardShouldPersistTaps="always"
          data={this.props.results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              id={item.Apartment_Unit_Id}
              onPress={() =>
                this.Citysave(
                  item.City + ", " + item.State,
                  item.Pincode,
                  item.City
                )
              }
            >
              <Text key={item.id} style={styles.item}>
                {item.City + ", " + item.State}
              </Text>
            </TouchableOpacity>
          )}
        />
      </TouchableWithoutFeedback>
    );
  }
}

CitySuggestion.propTypes = {
  savePlaces: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    color: "#3d3d3d",
    padding: 10,
    paddingLeft: 65
  }
});
