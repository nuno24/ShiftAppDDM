import { Button, View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';

const HomeScreen = ({ navigation }) => {

  const [isUser, setAdminScreen] = React.useState(true);

  const signOutPressed = () => {
    auth()
      .signOut()
      .then(navigation.replace("Login"))
  };

  useEffect(() => {
    if (auth().currentUser?.email.includes("@admin")) {
      setAdminScreen(false)
    }
  }, []);

  const [data] = React.useState([]);

  useEffect(() => {
    firestore()
      .doc(`utilizadores/${auth().currentUser?.email}`)
      .collection('turnos')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.id)
          console.log(doc.id)
        });
      });
  }, []);

  const [selected, setSelected] = React.useState("");

  const [startTime, setstartTime] = React.useState([]);
  const [endTime, setendTime] = React.useState([]);

  function getstartTime(documentSnapshot) { return documentSnapshot.get('inicio'); }
  function getendTime(documentSnapshot) { return documentSnapshot.get('fim'); }

  const userShiftStart = () => {
    firestore()
      .doc(`utilizadores/${auth().currentUser?.email}`)
      .collection('turnos')
      .doc(`${selected}`)
      .get()
      .then(documentSnapshot => getstartTime(documentSnapshot))
      .then(startTime => {
        const time = []
        time.push(startTime)
        setstartTime(time)
      })
  };

  const userShiftEnd = () => {
    firestore()
      .doc(`utilizadores/${auth().currentUser?.email}`)
      .collection('turnos')
      .doc(`${selected}`)
      .get()
      .then(documentSnapshot => getendTime(documentSnapshot))
      .then(endTime => {
        const time = []
        console.log(endTime);
        time.push(endTime)
        setendTime(time)
      });
  };


  const timeChange = () => {
    navigation.navigate("ShiftTimes")
  };

  

  if(!isUser){
    //se for admin
    return(
      <View>
        <Text style={styles.greeting} >Bem Vindo <Text>{auth().currentUser?.email.split('@')[0]}</Text></Text>

        <View style={isUser ? { display: 'flex' } : { display: 'none' }}>
          <SelectList style={{paddingTop: 70}}
            placeholder='Choose a Shift'
            setSelected={(val) => setSelected(val)}
            data={data}
            save="key"
            search={true}
            onSelect={async () => {
              Promise.all([userShiftStart(), userShiftEnd()]);
            }}
          />

          <View style={styles.row}>
            <Text>Shift Start Time: <Text style={{ fontWeight: 'bold' }}>{selected}</Text></Text>
            <Text>Shift End Time: <Text style={{ fontWeight: 'bold' }}>{startTime}</Text></Text>
            <Text>Shift's Date: <Text style={{ fontWeight: 'bold' }}>{endTime}</Text></Text>
          </View>

        </View>

        <View>
          <Button title='Logout' onPress={signOutPressed}></Button>
          <Text></Text>
          <Button title="Create Shifts" onPress={timeChange}></Button>
        </View>
        </View>
    )
  }
  else{
    //se nao for admin
    return(
      <View>
      <Text style={styles.greeting} >Bem Vindo <Text>{auth().currentUser?.email.split('@')[0]}</Text></Text>

      <View style={isUser ? { display: 'flex' } : { display: 'none' }}>
        
        <SelectList style={{paddingTop: 70}}
          placeholder='Choose a Shift'
          setSelected={(val) => setSelected(val)}
          data={data}
          save="key"
          search={false}
          onSelect={async () => {
            Promise.all([userShiftStart(), userShiftEnd()]);
          }}
        />

        <View>
          <Text>Shift Start Time: <Text style={{ fontWeight: 'bold' }}>{selected}</Text></Text>
          <Text>Shift End Time: <Text style={{ fontWeight: 'bold' }}>{startTime}</Text></Text>
          <Text>Shift's Date: <Text style={{ fontWeight: 'bold' }}>{endTime}</Text></Text>
        </View>

      </View>

      <View>
        <Button title='Logout' onPress={signOutPressed}></Button>
      </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  greeting: {
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 40,
    paddingTop: 10,
    alignSelf: 'center'
  },
  row: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    paddingTop: '50%',
    paddingBottom: '10%'
  },
  textinput: {
    borderRadius: 5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  }
});


export default HomeScreen;