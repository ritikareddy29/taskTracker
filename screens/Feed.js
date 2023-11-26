import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import TaskCard from "./TaskCard";

import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
//import firebase from "firebase";


import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
};

let tasks = require("./temp_tasks.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      tasks: []
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchTasks();
    this.fetchUser();
  }

  fetchTasks = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let tasks = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              tasks.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ tasks: tasks });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
      });
  };

  renderItem = ({ item: task }) => {
    return <TaskCard task={task} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={styles.container }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={styles.appTitleText}
              >
                Task Tracking App
              </Text>
            </View>
          </View>
          {!this.state.tasks[0] ? (
            <View style={styles.noTasks}>
              <Text
                style={styles.noTasksText
                }
              >
                No Tasks Created
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.tasks}
                renderItem={this.renderItem}
              />
            </View>
          )}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  },
  noTasks: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noTasksText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans"
  }
});