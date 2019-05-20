import React, { Component } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ProductStyles from "./ProductStyle";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
import ImagePicker from "react-native-image-picker";

Amplify.configure(awsConfig);

const styles = StyleSheet.create({ ...ProductStyles });
let userdetails = null;
class PreviewPersonalDetails extends Component {
  static defaultProps = {
    containerStyle: {}
  };
  state = {
    contact: "",
    name: "",
    filePath: {},
    email: ""
  };
  constructor(props) {
    super(props);
    userdetails = this.props.AllData.UserData;
  }

  componentDidMount() {
    this.setState({ contact: userdetails.phone_number });
    this.setState({ name: userdetails.name });
    this.setState({ email: userdetails.email });
  }

  chooseFile = () => {
    var options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" }
      ],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        //console.log("User cancelled image picker");
      } else if (response.error) {
        //console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        //console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source
        });
      }
    });
  };

  renderimage = () => {
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Avatar
          rounded
          size={90}
          activeOpacity={0.7}
          containerStyle={{ flex: 2 }}
          showEditButton
          //editButton={{ color: "#fff" }}
          onEditPress={this.chooseFile.bind(this)}
          source={
            this.state.filePath.data == null
              ? require("../../assets/profile.png")
              : {
                  uri: "data:image/jpeg;base64," + this.state.filePath.data
                }
          }
        />
      </View>
    );
  };
  renderDescription = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.lableinput}>Name</Text>
        <TextInput
          style={styles.checktextinputstyle}
          placeholder=""
          onChangeText={text => {
            this.setState({ name: text });
          }}
          value={this.state.name}
        />
        {/* <Text style={styles.lableinput}>Birth Date</Text>
        <TextInput
          style={styles.checktextinputstyle}
          placeholder=""
          value={userdetails.birthday}
        /> */}
        <Text style={styles.lableinput}>E-mail</Text>
        <TextInput
          style={styles.checktextinputstyle}
          placeholder=""
          editable={false}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          value={this.state.email}
        />
        <Text style={styles.lableinput}>Contact Number</Text>
        <TextInput
          style={styles.checktextinputstyle}
          placeholder=""
          onChangeText={text => {
            this.setState({ contact: text });
          }}
          value={this.state.contact}
        />
      </View>
    );
  };
  async updateData() {
    let user = await Auth.currentAuthenticatedUser();

    let result = await Auth.updateUserAttributes(user, {
      email: this.state.email,
      phone_number: this.state.contact,
      name: this.state.name
    });
    if (result == "SUCCESS") {
      alert("Profile changed Successfully.");
    } else {
      alert(result);
    }

    console.log(result);
  }
  render() {
    return (
      <View style={styles.mainviewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]} />
          <View style={styles.productRow}>{this.renderimage()}</View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
        </ScrollView>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => {
            this.updateData();
          }}
        >
          <Text style={styles.textFooter}>Update Info</Text>
        </TouchableOpacity>
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
)(PreviewPersonalDetails);
