import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  Button,
  Alert,
  AsyncStorage
} from "react-native";
import axios from "axios";

export default class Login extends React.Component {
  onChangeEmail(email) {
    this.setState({ email: email });
  }

  onChangePassword(password) {
    this.setState({ password: password });
  }

  constructor(props) {
    let nav = props.navigation.navigate;
    super(props);
    this.state = {
      email: "pat0@pat.com",
      password: "Pass@123",
      navigate: props.navigation.navigate
    };
  }

  submitLogin(email, password) {
    axios
      .post("http://5d4d3103.ngrok.io/login", {
        email: email,
        password: password
      })
      .then(response => this.handleResponse(response))
      // .then(this.state.navigate('Profile'))
      .catch(error => alert("hello" + error));
  }

  async handleResponse(response) {
    // console.log(response.data);
    if (response.status == 200) {
      // await AsyncStorage.setItem("email", response.data.email);
      await AsyncStorage.setItem("address", response.data.address);
      await AsyncStorage.setItem("id", String(response.data.id));
      await AsyncStorage.setItem("jwt", response.data.jwt);
      this.state.navigate("Profile");
      console.log(await AsyncStorage.getItem("email"));
    } else {
      alert(response.status);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    email = this.state.email;
    password = this.state.password;
    return (
      <View style={styles.AndroidSafeArea}>
        <View style={styles.container}>
          <Image
            style={{ marginLeft: 70, flex: 1, height: 175, width: 175 }}
            resizeMode="contain"
            source={require("../assets/bg.png")}
          />
        </View>
        <Text style={styles.menuText}>Login</Text>
        <View
          style={{
            marginVertical: 8,
            // flex: 1,
            flexDirection: "row",
            alignItems: "flex-start"
          }}
        >
          <Text style={{ fontSize: 24, color: "#00BFFF" }}>Email</Text>
          <TextInput
            style={{
              // height: 40,
              backgroundColor: "rgba(225,245,254 ,1)",
              borderRadius: 20,
              // marginTop: 12,
              marginHorizontal: 10,
              paddingHorizontal: 12,
              flex: 1
              // height: 40
            }}
            placeholder="ex: test@test.com"
            onChangeText={text => this.onChangeEmail(text)}
            value={email}
          />
        </View>
        <View
          style={{
            marginVertical: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "flex-start"
          }}
        >
          <Text style={{ fontSize: 24, color: "#00BFFF" }}>Password</Text>
          <TextInput
            secureTextEntry
            textContentType="password"
            style={{
              backgroundColor: "rgba(225,245,254 ,1)",
              borderRadius: 20,
              marginHorizontal: 10,
              paddingHorizontal: 12,
              flex: 1
            }}
            placeholder="ex: test@test.com"
            onChangeText={text => this.onChangePassword(text)}
            value={password}
          />
        </View>
        <Button
          title="Submit"
          onPress={() => this.submitLogin(email, password)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fafffe",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  container: {
    height: 250,
    width: "100%"
    // paddingRight: 20
  },
  menuText: {
    color: "rgba(3,155,229 ,1)",
    // alignSelf: "center",
    fontSize: 44,
    fontWeight: "bold"
    // paddingLeft: 24
  }
});
