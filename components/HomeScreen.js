import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import MyButton from './myButton';



const HomeScreen = ({ name, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.btnContainer}>
        <MyButton text="Play" color="green" width={100} height={50} onPress={() =>navigation.navigate('Game')} />
        <MyButton text="Help" color="red" width={100} height={50} onPress={() => Alert.alert("Hi")} />

      </View>
    </View>
  )
}

HomeScreen.defaultProps = {
  name: "Guess the Prophet"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#ededed',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 30,
    
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    margin: 20,
    paddingHorizontal: 10,
  },


  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "darkslateblue"
  }
});
export default HomeScreen;