import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';

const Register = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const [registrations, setRegistrations] = useState([]);

  const onChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const register = () => {
    axios
      .post("http://localhost:2000/register", {
        username: state.username,
        password: state.password,
      })
      .then((res) => {
        // Handle success
        console.log("Registration successful");
        setRegistrations([...registrations, { username: state.username, password: state.password }]);
        setState({
          username: "",
          password: "",
          confirm_password: "",
        });
      })
      .catch((err) => {
        // Handle error
        console.error("Registration error:", err);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Register</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          placeholder="User Name"
          value={state.username}
          onChangeText={text => onChange('username', text)}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          placeholder="Password"
          secureTextEntry
          value={state.password}
          onChangeText={text => onChange('password', text)}
        />
        <PasswordStrengthBar password={state.password} />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          placeholder="Confirm Password"
          secureTextEntry
          value={state.confirm_password}
          onChangeText={text => onChange('confirm_password', text)}
        />
        <Button
          title="Register"
          onPress={register}
          disabled={state.username === '' || state.password === '' || state.password !== state.confirm_password}
        />
        <TouchableOpacity onPress={() => console.log("Navigate to Login")}>
          <Text style={{ marginTop: 10 }}>Login</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Registered Users</Text>
          <FlatList
            data={registrations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text>{item.username}</Text>
                <Text>{item.password}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default Register;
