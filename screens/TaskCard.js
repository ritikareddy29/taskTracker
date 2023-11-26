import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
//import firebase from "firebase";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {

};

export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      task_id: this.props.task.key,
      task_data: this.props.task.value
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
      });
  };

  render() {
    let task = this.state.task_data;
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("TaskScreen", {
              stotaskry: this.props.task
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={styles.cardContainer
            }
          >
            <Image
              source={images[task.preview_image]}
              style={styles.taskImage}
            ></Image>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={styles.taskTitleText
                  }
                >
                  {task.title}
                </Text>
                <Text
                  style={styles.priority
                  }
                >
                  {task.priority}
                </Text>
                <Text
                  style={styles.dateDue
                  }
                >
                  {task.dateDue}
                </Text>
                <Text
                  style={styles.descriptionText
                  }
                >
                  {this.props.task.description}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  taskImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  taskTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  dateDue: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  descriptionContainer: {
    marginTop: RFValue(5)
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
});