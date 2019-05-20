import React, { Component } from "react";
import {
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Text
} from "react-native";

import { Button, SearchBar, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import RadioForm from "react-native-simple-radio-button";
const icon = require("../../assets/exit.png");
const radio_props = [
  { label: "Hollywood", value: 0 },
  { label: "Union Square", value: 1 },
  { label: "Downtown Los Angeles", value: 2 },
  { label: "Fisherman's Wharf", value: 3 },
  { label: "Lax Area", value: 4 },
  { label: "DownTown San Francisco", value: 5 },
  { label: "Gaslamp Quarter", value: 6 },
  { label: "DownTown San Diedo", value: 7 },
  { label: "Anaheim Resort", value: 8 },
  { label: "Pacific Beach", value: 9 },
  { label: "Mission Valley", value: 10 },
  { label: "Downtown Sacramento", value: 11 }
];
const items = [
  {
    name: "Property Amenities",
    id: 0,
    Icon: icon, // Make sure the icon const is set, or you can remove this
    children: [
      {
        name: "Washer/Dryer",
        id: 1
      },
      {
        name: "fitness Center",
        id: 2
      },
      {
        name: "Mailroom",
        id: 3
      },
      {
        name: "Conference Room",
        id: 4
      },
      {
        name: "Garage Parking",
        id: 5
      },
      {
        name: "Pets Allowed",
        id: 6
      },
      {
        name: "Patio",
        id: 7
      },
      {
        name: "Balcony",
        id: 8
      },
      {
        name: "Dishwasher",
        id: 9
      },
      {
        name: "Air Conditioning",
        id: 10
      },
      {
        name: "Hardwood Floor",
        id: 11
      }
    ]
  },
  {
    name: "Business Travel Ameneties",
    id: 12,
    Icon: icon,
    children: [
      {
        name: "Full Kitchen",
        id: 13
      },
      {
        name: "Coffee Machine",
        id: 14
      },
      {
        name: "Iron",
        id: 15
      },
      {
        name: "High Speed Internet",
        id: 16
      },
      {
        name: "Cable",
        id: 17
      },
      {
        name: "Smart TV",
        id: 18
      }
    ]
  }
];
export default class Filters extends Component {
  state = {
    modalVisible: false,
    Hotelchecked: false,
    Entirechecked: false,
    Privatechecked: false,
    Sharedchecked: false,
    AdultCount: 0,
    ChildrenCount: 0,
    selected: [],
    InfantCount: 0,
    radiovalue: 0,
    selectedItems: []
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  Aminity(dat) {}
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { container } = styles;
    const { checked } = this.state;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={{ height: "5.35%", backgroundColor: "white" }} />
          <View style={container}>
            <View style={styles.topbar}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Icon
                  name="close"
                  size={25}
                  color="#545455"
                  style={styles.selectedColor}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  color: "#545455",
                  marginTop: 0,
                  flexDirection: "row",
                  fontFamily: "OpenSans-SemiBold",
                  flex: 1
                }}
              >
                Filters
              </Text>
            </View>
            <View
              style={{
                padding: 13,
                flex: 0.798,
                backgroundColor: "white"
              }}
            >
              <ScrollView>
                <Text style={styles.textHeaders}>Price Range</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal: 5
                  }}
                >
                  <Text style={styles.pricevalue}>$20</Text>
                  <Text style={styles.pricevalue}>$200</Text>
                </View>
                <MultiSlider
                  containerStyle={{
                    marginHorizontal: 15,
                    height: 40
                  }}
                  snapped
                  key={2}
                  values={[0, 220]}
                  step={1}
                  min={140}
                  max={220}
                  sliderLength={360}
                  selectedStyle={{ backgroundColor: "#432355" }}
                  markerStyle={{
                    backgroundColor: "#432355",
                    height: 22,
                    width: 22
                  }}
                  trackStyle={{
                    height: 4
                  }}
                  touchDimensions={{
                    slipDisplacement: 10
                  }}
                  onValuesChangeStart={this.disableScroll}
                  onValuesChangeFinish={this.enableScroll}
                />
                <Text style={{ ...styles.textHeaders, marginTop: 35 }}>
                  Amenities
                </Text>
                <SectionedMultiSelect
                  items={items}
                  uniqueKey="id"
                  subKey="children"
                  iconKey="icon"
                  selectText="Select amenities..."
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  showRemoveAll
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                  colors={{
                    primary: "#432355",
                    success: "#432355",
                    itemBackground: "#DFDFDF"
                  }}
                  styles={{
                    selectToggle: {
                      backgroundColor: "#f9f9f9",
                      borderColor: "#DFDFDF",
                      borderWidth: 1,
                      borderRadius: 19,
                      fontSize: 12,
                      marginTop: 5,
                      marginHorizontal: 5,
                      padding: 12,
                      fontFamily: "OpenSans-Regular"
                    },
                    chipContainer: {
                      backgroundColor: "#432355",
                      marginTop: 10,
                      marginBottom: 5,
                      marginHorizontal: 5
                    },
                    chipText: { color: "#fff" },
                    chipIcon: { color: "#fff" },
                    scrollView: { marginTop: 10, paddingHorizontal: 0 },
                    item: { borderBottomColor: "#fff" },
                    itemText: {
                      fontFamily: "OpenSans-Regular",
                      paddingHorizontal: 16,
                      paddingVertical: 8
                    },
                    subItem: { marginHorizontal: 15 },
                    selectedSubItemText: {
                      color: "#432355",
                      fontFamily: "OpenSans-SemiBold"
                    },
                    subItemText: {
                      fontFamily: "OpenSans-Regular",
                      paddingHorizontal: 16,
                      paddingVertical: 8
                    },
                    itemIconStyle: {
                      backgroundColor: "#432355"
                    }
                  }}
                />

                <Text
                  style={{
                    ...styles.textHeaders,
                    marginTop: 10,
                    marginBottom: 10,
                    marginTop: 35
                  }}
                >
                  Neighbourhoods
                </Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={1}
                  buttonColor={"#cccfdb"}
                  buttonSize={10}
                  buttonOuterSize={20}
                  selectedButtonColor={"#432355"}
                  labelColor={"#432355"}
                  labelStyle={{
                    fontSize: 14,
                    color: "#3d3d3d",
                    marginBottom: 16
                  }}
                  style={{ marginHorizontal: 12 }}
                  onPress={radiovalue => {
                    this.setState({ value: radiovalue });
                  }}
                />
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => this.setModalVisible(false)}
            >
              <Text style={styles.textFooter}>Show 650+ Properties</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Filters"
            type="outline"
            onPress={() => this.setModalVisible(true)}
            icon={
              <Icon
                name="filter"
                type="font-awesome"
                color="#432355"
                size={18}
                style={styles.filterIconleft}
              />
            }
            buttonStyle={styles.filterButton}
            titleStyle={styles.filtertitle}
          />
        </View>
      </View>
    );
  }
}

Filters.propTypes = {
  saveGuests: PropTypes.func,
  saveRoomType: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  filterIconleft: {
    marginRight: 10
  },
  filterButton: {
    borderWidth: 1,
    borderRadius: 19,
    paddingHorizontal: 20,
    borderColor: "#432355",
    marginTop: -20,
    backgroundColor: "white"
  },
  filtertitle: {
    color: "#432355"
  },
  buttonFooter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  borderCenter: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#FFA890"
  },
  textFooter: {
    color: "#fff",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold"
  },
  textHeaders: {
    fontSize: 16,
    color: "#432355",
    marginLeft: 10,
    fontFamily: "OpenSans-SemiBold"
  },
  pricevalue: {
    fontSize: 13,
    color: "#432355",
    marginLeft: 10,
    fontFamily: "OpenSans-SemiBold"
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    justifyContent: "center",

    bottom: 0,
    backgroundColor: "#432355",
    flexDirection: "row",
    height: 65,
    alignItems: "center"
  },
  topbar: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#fff",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d0cfd1"
  },
  selectedColor: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
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
    paddingVertical: 1,
    fontFamily: "OpenSans-Regular"
  },
  searchinputstyle: {
    backgroundColor: "#fff",
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});
