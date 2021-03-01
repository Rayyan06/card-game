import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MyButton = ({ text, color, width, height, onPress, padding, margin}) => {
  return <TouchableOpacity onPress style={{
    backgroundColor: color,
    flex: 0.1,
    justifyContent: "center",
    padding,
    width,
    height,
    alignItems: "center",
    borderRadius: 5,
    margin,

  }}>
    <Text style={styles.text}>{ text }</Text>
  </TouchableOpacity>
}

MyButton.defaultProps = {
  padding: 10,
  margin: 10,
  width: 50,
  height: 100
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "white"
  }
})

export default MyButton;