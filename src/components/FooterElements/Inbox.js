import React from "react";
import {
  Dimensions,
  Text,
  View,
  Button,
  StyleSheet,
  Image
} from "react-native";
import ImageHeader from "../ImageHeader";
import * as actions from "../../actions";
import { GiftedChat } from "react-native-gifted-chat";

import { connect } from "react-redux";

const winHeight = Dimensions.get("window").height;
const winWidth = Dimensions.get("window").width;

class Inbox extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello,\nHow can we help you.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    const { maincontainer, container } = styles;
    return (
      <View style={maincontainer}>
        <View style={container}>
          <GiftedChat
            containerStyle={{
              marginTop: "0%"
            }}
            wrapperStyle={{
              marginTop: "20%"
            }}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </View>
        <ImageHeader title="    Inbox" />
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
)(Inbox);
export { ConnectComponent as Inbox };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginBottom: 5
  },
  maincontainer: { flex: 1, flexDirection: "column", position: "relative" }
});
