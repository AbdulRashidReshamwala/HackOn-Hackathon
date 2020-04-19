import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Button,
  ScrollView
} from "react-native";
import axios from "axios";
import FileTable from "./FilesView";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {};
  }

  populateProfile(data) {
    // console.log('here')
    let profile = data.patient_details;
    // console.log(data.files)
    // this.setState ({files:data.files})
    // console.log(profile)
    this.setState({
      address: profile[0],
      name: profile[1],
      aadhar: profile[2],
      files: data.files
    });
    // console.log(this.state.files)
  }

  async componentDidMount() {
    // let email = await AsyncStorage.getItem('email');
    let jwt = await AsyncStorage.getItem("jwt");
    this.setState({ jwt: jwt });
    const headers = {
      "Content-Type": "application/json",
      auth: jwt
    };

    let formData = new FormData();
    formData.append("jwt", jwt);
    console.log(jwt);
    axios({
      url: "http://5d4d3103.ngrok.io/patient/dashboard",
      method: "POST",
      data: formData
    })
      .then(response => this.populateProfile(response.data))
      .catch(err => alert(err.message));

    this.setState({ email: email });

    // console.log(this.state.email)
  }

  render() {
    let nav = this.navigate;
    let table;
    if (this.state.files) {
      table = (
        <FileTable
          files={this.state.files}
          navigate={this.navigate}
        ></FileTable>
      );
    } else {
      table = <Text>Loading</Text>;
    }
    return (
      <ScrollView style={{ marginBottom: 24 }}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
            }}
          />

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.description}>Email : {this.state.email}</Text>
              <Text style={styles.description}>
                Aadhar Id : {this.state.aadhar}
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 10, marginHorizontal: 14 }}>
            <Button title="Add new report" onPress={() => nav("Uploads")} />
          </View>
          <View style={{ paddingBottom: 10, marginHorizontal: 14 }}>
            <Button
              title="Refresh"
              onPress={() => {
                let formData = new FormData();
                formData.append("jwt", this.state.jwt);
                console.log(jwt);
                axios({
                  url: "http://5d4d3103.ngrok.io/patient/dashboard",
                  method: "POST",
                  data: formData
                })
                  .then(response => this.populateProfile(response.data))
                  .catch(err => alert(err.message));
              }}
            />
          </View>
          <Text style={styles.my}>Reports</Text>
          {table}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 80
  },
  avatar: {
    width: 130,
    height: 130,
    // marginRight: 20,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    // marginBottom: 10,
    alignSelf: "center",
    // position: 'absolute',
    marginTop: -60
    // marginBottom:-20
  },
  name: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600"
  },
  body: {
    marginTop: 5
  },
  bodyContent: {
    // paddingTop: 80,
    // paddingLeft: 8,
    alignItems: "center"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  my: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#00BFFF",
    elevation: 2,
    fontSize: 25,
    height: 40,
    marginHorizontal: 12
    // borderRadius: 40,
  }
});
