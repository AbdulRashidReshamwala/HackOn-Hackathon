import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Linking
} from "react-native";
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

export default class ViewFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.navigation.state.params.id };
    // console.log(this.props.navigation.state.params.id)
  }

  async componentDidMount() {
    console.log(this.state.id);
    axios
      .get("http://5d4d3103.ngrok.io/file/" + this.state.id)
      .then(response => {
        this.setDetails(response.data);
      })
      .catch(error => alert(error));
  }

  setDetails(data) {
    this.setState({
      b64img: data.b64img,
      owner: data.owner,
      filename: data.filename,
      summary: data.summary
    });
  }

  render() {
    let { navigate } = this.props.navigation;
    if (this.state.b64img != null) {
      // console.log('nahi')
      return (
        <ScrollView>
          <View>
            <View style={styles.header}>
              <Text style={styles.heading}>File Info</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.body}>
                <View style={styles.bodycontent}>
                  <View style={styles.owncard}>
                    <Button
                      onPress={() => navigate("Share", { id: this.state.id })}
                      // icon={
                      //     <Icon

                      //     name="share-alt"
                      //     size={15}
                      //     color="white"
                      //     />
                      // }
                      title="Share"
                    />
                    <Text style={styles.text}>Name: {this.state.filename}</Text>
                    <Text style={styles.text}>Owner: {this.state.owner}</Text>
                    <View style={{ height: 250, width: "100%" }}>
                      <Image
                        style={{ flex: 1, height: undefined, width: undefined }}
                        resizeMode="contain"
                        source={{
                          uri: "data:image/png;base64," + this.state.b64img
                        }}
                      />
                    </View>
                    <Text style={styles.text}>Symptoms:</Text>
                    {this.state.summary.Disease.map(d => {
                      return (
                        <>
                          <Text>{d[0]} </Text>
                          <Button
                            title="More info"
                            onPress={() =>
                              Linking.openURL(
                                "http://finto.fi/mesh/en/page/" + d[1]
                              )
                            }
                          />
                        </>
                      );
                    })}
                    <Text style={styles.text}>Medications:</Text>
                    {this.state.summary.Drug.map(d => {
                      return (
                        <>
                          <Text>{d[0]} </Text>
                          <Button
                            title="More info"
                            onPress={() =>
                              Linking.openURL(
                                "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:" +
                                  d[1]
                              )
                            }
                          />
                        </>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}
const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#00BFFF"
  },
  heading: {
    color: "white",
    fontWeight: "200",
    fontSize: 55,
    paddingTop: 90,
    paddingLeft: 120
  },
  body: {
    marginTop: 20,
    marginLeft: 20
  },
  text: {
    fontSize: 20
  },
  // file: {
  //     // marginTop: 60,
  //     // marginLeft: 90,
  //     width: 250,
  //     height: 200
  // },
  owncard: {
    padding: 20,
    backgroundColor: "#B0Dfe5",
    elevation: 10,
    marginRight: 20
  }
});
