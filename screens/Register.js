import { Button, View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setAdmin] = useState(true);

  const registerButtonPress = () => {
    setEmail(email)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('utilizadores')
          .doc(email)
          .set({
            isAdmin: isAdmin,
            email: email
          })
          .then(() => {
            navigation.replace("Home");
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert("Email already in use.");
        }
        if (error.code === 'auth/invalid-email') {
          alert("Invalid Email");
        }
      });
  };

  const loginButtonPress = () => {
    navigation.replace("Login")
  };

  const userTypeChange = () => {
    if (isAdmin)
      setAdmin(false)
    else
      setAdmin(true)
  };

  return (
    <View style={styles.row}>

      <TextInput
        value={email}
        onChangeText={email => setEmail(email)}
        placeholder="Email"
        style={styles.email}
      />

      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        style={styles.password}
      />

      <Text></Text>
      <Button style={{width: "40%"}} title={isAdmin ? "Type: Admin" : "Type: User"} onPress={userTypeChange}></Button>

      <Text></Text>
      <Button title='Register' onPress={registerButtonPress}></Button>

      <View style= {{alignItems: 'center', paddingTop: 20,  justifyContent: 'center',}}>
      <TouchableOpacity style= {{textAlign: 'center', textAlign: 'center'}} onPress={loginButtonPress}>
        <Text style={styles.login}>Already have an account? {"\n"}Sign in here!</Text>
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
  teste: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  login: {
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    alignContent: 'center',
    color: '#629acc',
  }
});


export default RegisterScreen;