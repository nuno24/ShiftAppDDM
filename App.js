import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/Register';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import ShiftTimes from './screens/ShiftTimes';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShiftTimes" component={ShiftTimes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

