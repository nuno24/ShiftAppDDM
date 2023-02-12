import { Button, View, TextInput, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInPressed = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.replace("Home")
      })
      .catch(() => {
        alert("An Error has occured")
      })

  };

  const changeRegister = () => {
    navigation.replace("Register")
  };

  return (
    <View style={styles.row}>

      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        style={styles.email}
      />

      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        style={styles.password}
      />

      <Text></Text>
      <Button title='Login' onPress={signInPressed}></Button>
      <Text>  </Text>
      
      <View style= {{alignItems: 'center', paddingTop: 10,  justifyContent: 'center',}}>
      <TouchableOpacity style= {{textAlign: 'center', textAlign: 'center'}} onPress={changeRegister}>
        <Text style={styles.register}>Don't Have an account?{"\n"}Create one right now</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    paddingTop: 50,
  },
  email: {
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  password: {
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  register: {
    textDecorationLine: 'underline',
    color: '#629acc',
    alignContent: 'center',
  },
});



export default LoginScreen;