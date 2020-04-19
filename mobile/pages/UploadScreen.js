import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from "axios";

export default class UploadScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.navigate = this.props.navigation.navigate
    }

    async componentDidMount(){
        let email = await AsyncStorage.getItem('email');
        let address = await AsyncStorage.getItem('address');
        this.setState({email:email,address:address})
    }
    render() {
        let { image } = this.state;

        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Upload your report from Camera Roll"
                    onPress={this._pickImage}
                />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }<Button style={{ marginTop: 2 }} title="Upload" onPress={() => this.uploadImage()} />

            </View>

        );
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }

    uploadImage(){
    const headers = {
            'Content-Type': 'application/json',
            'email': this.state.email
    
    }
    axios
      .post("http://192.168.43.140:5000/api/upload", {
      headers:headers,  
      email: this.state.email,
        b64: this.state.base64
      })
      .then((response)=>{
          alert(response.data.msg)
          this.navigate('Profile')
        })
    //   .then()
      .catch(error => alert('hello'+error));
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            quality: 1
        });
        // console.log(result.base64)

        if (!result.cancelled) {
            this.setState({ image: result.uri , base64:result.base64});
        }
    };
}
