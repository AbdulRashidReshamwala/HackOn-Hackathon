import React, { Component } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

class BarcodeScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params.id);

    this.state = {
      granted: true,
      scanned: false,
      id: this.props.navigation.state.params.id
    };
  }

  async componentDidMount() {
    let email = await AsyncStorage.getItem("email");
    let address = await AsyncStorage.getItem("address");
    // console.log(await AsyncStorage.getItem('jwt'));
    this.setState({ email: email, address: address });
  }

  handleBarCodeScanned(data) {
    console.log(data.data);
    this.setState({ scanned: true });
    axios
      .post("http://5d4d3103.ngrok.io/file/share", {
        email: this.state.email,
        data: data.data,
        id: this.state.id,
        address: this.state.address
      })
      .then(response => alert(response.data.msg))
      .catch(err => alert(err));
    // alert(`Bar code with type  and data ${data.data} has been scanned!`);
  }

  async getPermission() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ status: status });
  }

  render() {
    let { scanned } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        {/* <Text>email</Text> */}
        <BarCodeScanner
          onBarCodeScanned={data =>
            scanned ? undefined : this.handleBarCodeScanned(data)
          }
          style={StyleSheet.absoluteFillObject}
        />
        <Button
          title={"again"}
          onPress={() => this.setState({ scanned: false })}
        />
      </View>
    );
  }
}

export default BarcodeScreen;

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//       }}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />

//       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//     </View>
//   );
// }
