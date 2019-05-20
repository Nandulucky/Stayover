import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  View
} from "react-native";
import { SearchBar } from "react-native-elements";
import CitySuggestion from "../explorePageComponents/CitySuggestion";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import PropTypes from "prop-types";
//import { ScrollView } from "react-native-gesture-handler";

export default class SearchCity extends Component {
  state = {
    modalVisible: false,
    error: false,
    query: "",
    results: ["demo"]
  };

  async getSearchCityData() {
    const response = await axios

      .get(
        `https://vp3zckv2r8.execute-api.us-east-1.amazonaws.com/latest/search/${
          this.state.query
        }`
      )
      .then(({ data }) => {
        this.setState({
          results: data
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ error: true });
      });
  }
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.savePlaces = this.savePlaces.bind(this);
  }

  handleInputChange() {
    if (this.state.query && this.state.query.length >= 1) {
      // this.showDropdown()
      this.getSearchCityData();
    } else if (!this.state.query) {
      // this.hideDropdown()
    }
  }

  savePlaces(showval, pincode, City) {
    this.props.savePlace(showval, pincode, City);
    this.setModalVisible(false);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleClear = () => {
    this.handleInputChange("");
    this.refs.CitySearchbox.clear();
  };
  onDateChange = () => {};
  render() {
    const { imageStyle, container } = styles;

    return (
      <View>
        <Modal
          animationType="fade"
          keyboardShouldPersistTaps="always"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <ScrollView style={container} keyboardShouldPersistTaps="always">
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
                  style={{ margin: 9, marginRight: 3 }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Icon
                    name="arrowleft"
                    color="#fff"
                    style={{
                      fontSize: 20,
                      paddingTop: 15,
                      fontFamily: "OpenSans-Regular"
                    }}
                  />
                </TouchableOpacity>

                <TextInput
                  placeholder="Search"
                  ref="CitySearchbox"
                  placeholderTextColor="#a79ab0"
                  inputStyle={{ marginleft: 8 }}
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 15,

                    margin: 9,
                    backgroundColor: "#532e68",
                    color: "#fff",
                    width: "85%",
                    borderRadius: 19,
                    alignItems: "center",
                    fontFamily: "OpenSans-Regular"
                  }}
                  autoFocus={true}
                  clearButtonMode="always"
                  keyboardShouldPersistTaps="always"
                  onChangeText={text => {
                    this.setState({ query: text });
                    this.handleInputChange();
                  }}
                />

                <TouchableOpacity
                  onPress={this.handleClear}
                  style={{
                    position: "absolute",
                    margin: "1%",
                    marginLeft: "85%"
                  }}
                >
                  <Icon
                    name="close"
                    color="#fff"
                    style={{ fontSize: 20, paddingTop: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {this.state.results.length >= 1 ? (
              this.state.results[0] != "demo" ? (
                <CitySuggestion
                  results={this.state.results}
                  navigation={this.props.navigation}
                  savePlaces={this.savePlaces}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "OpenSans-Regular",
                    color: "#3d3d3d",
                    padding: 10,
                    paddingLeft: 65
                  }}
                />
              )
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "OpenSans-Regular",
                  color: "#3d3d3d",
                  padding: 10,
                  paddingLeft: 65
                }}
              >
                No Results Found...
              </Text>
            )}
          </ScrollView>
        </Modal>
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <SearchBar
            lightTheme={true}
            containerStyle={styles.searchcontainer}
            inputContainerStyle={styles.searchinputstyle}
            inputStyle={styles.inputstyless}
            placeholder="Where are you traveling?"
            placeholderTextColor="#808080"
            searchIcon={{ position: "absolute", margin: 10, marginLeft: 3 }}
            round={true}
            value={this.props.place}
            editable={false}
            placeholderFontSize={50}
            onPress={() => this.setModalVisible(true)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
SearchCity.propTypes = {
  savePlace: PropTypes.func
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchcontainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 0
  },
  inputstyless: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#3d3d3d",
    textTransform: "capitalize",
    marginLeft: 20
  },
  searchinputstyle: {
    backgroundColor: "white",
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 19,
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});
