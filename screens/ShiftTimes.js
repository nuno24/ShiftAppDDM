import { Button, View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import firestore from '@react-native-firebase/firestore'
import RNDateTimePicker from '@react-native-community/datetimepicker';

const ShiftTimes = ({ navigation }) => {

  const [dayPicker, setDayPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const chooseDayPress = () => {
    setDayPicker(true);
  };

  const handleDateChange = (date) => {
    setDayPicker(false);
    setSelectedDate(date);
  };

  const dateString = selectedDate.toLocaleString();
  const comma = dateString.indexOf(",");
  let dateDay = dateString.substring(0, comma);

  let dbDay = dateDay.split('/').join('-');

  const timeUpdate = () => {
    firestore()
      .doc(`utilizadores/${email}`)
      .collection('turnos')
      .doc(dbDay)
      .set({
        start: startDay,
        end: shiftEnd
      })
      .then(() => {
        alert("Your shift has been created!");
      });
  };

  const [email, setEmail] = useState('');

  const [hourPicker, setHourPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const chooseDayPress2 = () => {
    setHourPicker(true);
  };

  const handleTimeChange = (event, date) => {
    setHourPicker(false);
    setSelectedTime(date);
  };

  const timeString = selectedTime.toTimeString();

  const indexdp = timeString.split(":");

  const startDay = indexdp.slice(0, 2).join(":");

  const parts = startDay.split(':');

  const shiftEnd = `${(parseInt(parts[0]) + 8) % 24}:${parts[1]}`

  return (
    <View style={styles.row}>

      <View style={{alignItems: 'center'}}>
      <Text style={styles.text}>Shift Start Time</Text>
      <Text style={styles.texttime}>{startDay}</Text>
      <Text style={styles.text}>Shift End Time</Text>
      <Text style={styles.texttime}>{shiftEnd}</Text>
      <Text style={styles.text}>Shift's Date</Text>
      <Text style={styles.texttime}>{selectedDate.toLocaleDateString()}</Text>
      </View>

      <TextInput
        value={email}
        placeholder="User email"
        onChangeText={text => setEmail(text)}
        style={styles.textinput}
      />

      <Button title='Choose hour' onPress={chooseDayPress2}></Button>
      {hourPicker && (
        <RNDateTimePicker
          value={selectedTime}
          minuteInterval={10}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text></Text>

      <Button title='Choose day' onPress={chooseDayPress} />
      {dayPicker && (
        <RNDateTimePicker
          value={selectedDate}
          minimumDate={new Date()}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      <Text></Text>

      <Button title='Create shift' onPress={timeUpdate}></Button>

    </View>
  );


};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    paddingTop: '20%',
  },
  textinput: {
    borderRadius: 5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  text:{
    fontSize: 25,
    alignItems:'center'
  },
  texttime:{
    fontSize: 19,
    fontWeight: 'bold'
  }
});

export default ShiftTimes;