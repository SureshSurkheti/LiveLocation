// import * as Permissions from 'expo-permissions';
// import { StatusBar } from "expo-status-bar";
// import React, {Component} from "react";
// import {
//   StyleSheet,
//   Text,Image,
//   View,Button,Alert,TouchableOpacity,
// } from 'react-native';
// import * as Location from "expo-location";

// export default function App() {
//   async function GetLocation(){
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);

//     if (status !== "granted") {
//       Alert.alert(
//         "Permission not granted",
//         "Allow the app to use location service.",
//         [{ text: "OK" }],
//         { cancelable: false }
//       );
//     }

//     let { coords } = await Location.getCurrentPositionAsync();

//     if (coords) {
//       const { latitude, longitude } = coords;
//       let response = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });

//       for (let item of response) {
//         let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

//         alert(address)
//       }
//     }
//   };
//     return(
//       <View style = {styles.container}>
//     <Button title="Show My Location" onPress={GetLocation} />
//     <StatusBar style="auto" />
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5CFF',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// import React from "react";
// import { Text, View, StyleSheet } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { Input } from "react-native-elements";

// const GOOGLE_PLACES_API_KEY = "AIzaSyCMANyWvjcYxwagcf0NNch5rJEGrNTMmvg";

// const GooglePlacesInput = () => {
//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//         placeholder="Enter the location"
//         query={{
//           key: "AIzaSyCMANyWvjcYxwagcf0NNch5rJEGrNTMmvg",
//           language: "en", // language of the results
//         }}
//         onPress={(data, details) => console.log(data, details)}
//         textInputProps={{
//           marginHorizontal: 20,
//           borderRadius: 5,
//           borderWidth: 1,
//           borderColor: `#808080`,
//           // InputComp: Input,
//           // leftIcon: { type: 'font-awesome', name: 'chevron-left' },
//           errorStyle: { color: "red" },
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 100,
//   },
// });

// export default GooglePlacesInput;

// import React, { useState, useEffect } from "react";
// import { Platform, Text, View, StyleSheet } from "react-native";
// import Constants from "expo-constants";
// import * as Location from "expo-location";

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLatitude(location.coords.latitude);
//       setLongitude(location.coords.longitude);
//       setLocation(location.coords);
//     })();
//   }, []);

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
//   // console.warn("latitude: ", latitude);
//   // console.warn("longitude: ", longitude);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>latitude:{latitude}</Text>
//       <Text style={styles.paragraph}>longitude:{longitude}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: "center",
//   },
// });

const useNotifications = () => {
  registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };
};

export default useNotifications;
