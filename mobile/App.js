import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import HomeScreen from './pages/Home'
import LoginScreen from './pages/Login'
import ProfileScreen from './pages/Profile'
import BarcodeScreen from './pages/Barcode'
import ViewFileScreen from './pages/ViewFileScreen'
import UploadScreen from './pages/UploadScreen'

const MainNavigator = createStackNavigator({
  Home: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  File:{screen : ViewFileScreen},
  Share:{screen: BarcodeScreen},
  Uploads:{screen:UploadScreen},

});

const App = createAppContainer(MainNavigator);

export default App;