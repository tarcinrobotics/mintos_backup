import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AuthContext from "./AuthProvider"; // Assuming you've moved AuthProvider.js to src

const Login = ({ navigation }) => {
  const { setIsLogin } = useContext(AuthContext);
  const [state, setState] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const onChange = (key, value) => setState({ ...state, [key]: value });

  const togglePasswordVisibility = () => {
    setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  const login = () => {
    console.log('Login state:', state);
    // Perform login logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User Name / Email"
        value={state.username}
        onChangeText={text => onChange('username', text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!state.showPassword}
          value={state.password}
          onChangeText={text => onChange('password', text)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
          <Text>{state.showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Log In" onPress={login} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  toggleButton: {
    marginLeft: 10,
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#1E90FF',
  },
});
