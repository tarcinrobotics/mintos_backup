import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'; // Assuming you've moved Login.js to src/components
import Register from './components/Register'; // Assuming you've moved Register.js to src/components
import AnimLoader from '.src/components/AnimLoader'; // Assuming you've moved AnimLoader.js to src/components
import { AuthProvider } from './AuthProvider'; // Assuming you've moved AuthProvider.js to src

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={AnimLoader} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
