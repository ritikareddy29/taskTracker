import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
//import firebase from "firebase";


import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {

};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      profile_image: "",
      name: ""
    };
  }

  toggleSwitch() {
    const previous_state = this.state.isEnabled;
    var updates = {};
    updates[
      "/users/" + firebase.auth().currentUser.uid
    ] = theme;
    firebase
      .database()
      .ref()
      .update(updates);
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async fetchUser() {
    let name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
      });
    this.setState({
      isEnabled: theme === "light" ? false : true,
      name: name,
      profile_image: image
    });
  }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={styles.container
          }
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
                style={styles.appTitleText
                }
              >
                Habit Tracking App
              </Text>
            </View>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../assets/profileImg.png")}
                style={styles.profileImage}
              ></Image>
              <Text
                style={styles.nameText
                }
              >
                {this.state.name}
              </Text>
            </View>
            </View>
            <View style={{ flex: 0.3 }} />
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
  screenContainer: {
    flex: 0.85
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },

  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  }
});