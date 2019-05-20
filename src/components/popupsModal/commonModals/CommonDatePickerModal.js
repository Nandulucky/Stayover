import React, { Component } from "react";
import {
  Modal,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
//import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { connect } from "react-redux";

import * as actions from "../../../actions";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const daysToAdd = 3;
class CommonDatePickerModal extends Component {
  state = {
    modalVisible: false,
    startDateChecker: null,
    selectedStartDate: new Date().toDateString(),
    selectedEndDate: null,
    rangeOfdates: {}
  };
  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }
  setModalVisible(visible) {
    this.props.setDateModalVisible(visible);
  }

  onDateChange(date, type) {
    var startdate = null;
    var endDate = null;

    if (type === "END_DATE") {
      endDate = date;

      var d1 = new Date(this.state.selectedStartDate);
      var d2 = new Date(endDate);
      if (d1.getTime() == d2.getTime()) {
        this.setState({ selectedEndDate: null });

        alert("Please select two different dates!");
        // this.setState({
        //   selectedEndDate: new Date(
        //     d1.setDate(d1.getDate() + daysToAdd) //add days
        //   ).toDateString()
        // });
      } else {
        this.setState({ selectedEndDate: endDate });
      }
      this.props.saveDate(startdate, endDate);
    } else {
      this.setState({ selectedEndDate: null });

      startdate = date;
      this.setState({ selectedStartDate: new Date(date).toDateString() });

      this.props.saveDate(startdate, endDate);
    }
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
    return weekday[day] + ", " + month[monthIndex] + " " + newd.getDate();
  }
  getDates(startDate, stopDate) {
    var dateObject = {};
    var currentDate = startDate;

    var now = new Date(startDate);
    for (var d = now; d <= new Date(stopDate); d.setDate(d.getDate() + 1)) {
      var dategiven = new Date(d);
      var month = dategiven.getMonth() + 1;
      var day = dategiven.getDate();
      var year = dategiven.getFullYear();
      if (d.getTime() == startDate.getTime()) {
        dateObject[
          (year + "-" + (month < 10 ? 0 : "") + month + "-" + day).toString()
        ] = {
          selected: true,
          startingDay: true,
          color: "green",
          textColor: "gray"
        };
      } else if (d.getTime() == stopDate.getTime()) {
        dateObject[
          (year + "-" + (month < 10 ? 0 : "") + month + "-" + day).toString()
        ] = {
          selected: true,
          color: "green",
          endingDay: true,
          textColor: "gray"
        };
      } else {
        dateObject[
          (
            year +
            "-" +
            (month < 10 ? 0 : "") +
            month +
            "-" +
            (day < 10 ? 0 : "") +
            day
          ).toString()
        ] = {
          selected: true,
          color: "green",
          textColor: "gray"
        };
      }
    }

    return dateObject;
  }
  CheckinCheckout = (value, type) => {
    // if (this.props.isCheckin) {
    //   this.props.AddCheckin(value);
    // } else {
    //   this.props.AddCheckout(value);
    // }
  };

  DateRangeSelection = day => {
    if (this.state.startDateChecker == null) {
      this.setState({
        rangeOfdates: this.getDates(
          new Date(day.dateString),
          new Date(day.dateString)
        ),
        startDateChecker: new Date(day.dateString)
      });
    } else {
      this.setState({
        rangeOfdates: this.getDates(
          new Date(this.state.startDateChecker),
          new Date(day.dateString)
        )
      });
      this.setState({
        startDateChecker: null
      });
    }
  };
  render() {
    const { textstyle, imageStyle, buttonstyle, container } = styles;

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalstart}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Icon name="close" size={25} style={styles.selectedColor} />
              {/* <Text style={styles.cancelselectedColor}>Clear</Text> */}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              textAlign: "center",
              alignItems: "center",
              marginBottom: "10%"
            }}
          >
            Modify your Dates.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginTop: 12,
                color: "#432355",
                fontFamily: "OpenSans-Semibold"
              }}
            >
              {this.formatDate(this.state.selectedStartDate)}
            </Text>
            <Image
              source={require("../../../assets/slash.png")}
              style={styles.slash}
            />
            <Text
              style={{
                marginTop: 12,
                fontSize: 18,
                color: "#432355",
                fontFamily: "OpenSans-Semibold"
              }}
            >
              {this.formatDate(
                this.state.selectedEndDate == null
                  ? this.props.AllData.CheckOut
                  : this.state.selectedEndDate
              )}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()}
              todayBackgroundColor="#bfbfbf"
              selectedDayColor="#432355"
              // selectedStartDate={new Date(this.state.selectedStartDate)}
              // selectedEndDate={new Date(this.state.selectedEndDate)}
              selectedDayTextColor="#FFFFFF"
              onDateChange={this.onDateChange}
            />
            {/* <CalendarList
              // Callback which gets executed when visible months change in scroll view. Default = undefined
              onVisibleMonthsChange={months => {
                console.log("now these months are visible", months);
              }}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={5}
              markingType={"period"}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={50}
              onDayPress={day => {
                this.DateRangeSelection(day);
                console.log("selected day", day);
              }}
              markedDates={this.state.rangeOfdates}
              // Enable or disable scrolling of calendar list
              scrollEnabled={true}
              // Enable or disable vertical scroll indicator. Default = false
              showScrollIndicator={true}
              markingType={"period"}

              //...calendarParams
            /> */}
          </View>
          <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              if (this.state.selectedEndDate != null) {
                this.setModalVisible(false);
              } else {
                alert("Please select end date.");
              }
            }}
          >
            <Text style={styles.textFooter}>Proceed</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
CommonDatePickerModal.propTypes = {
  setDateModalVisible: PropTypes.func,
  saveDate: PropTypes.func
};

var mapStateToProps = State => {
  return { AllData: State };
};

export default connect(
  mapStateToProps,
  actions
)(CommonDatePickerModal);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textinputstyle: {
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 9,
    marginBottom: 14,
    marginTop: 6
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
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18,
    fontFamily: "OpenSans-Regular"
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "#432355",
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    borderColor: "#432355",
    borderWidth: 2
  },
  buttonstyle: {
    backgroundColor: "transparent",
    borderColor: "#DFDFDF",
    borderWidth: 2,
    borderRadius: 25
  },
  textstyle: {
    flex: 1,
    alignItems: "center",
    height: 40,
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    top: 13,
    fontSize: 24,
    fontFamily: "OpenSans-Regular"
  },
  imageStyle: {
    alignItems: "flex-end",
    width: 50,
    height: 50
  },
  selectedColor: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  cancelselectedColor: {
    margin: 10,
    fontSize: 16,
    textAlign: "right",
    fontFamily: "OpenSans-Regular"
  },
  slash: {
    marginTop: 12,
    width: 20,
    height: 30
  }
});
