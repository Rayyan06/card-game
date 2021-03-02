import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AnswerText from "./answerText";

const GameButton = ({ item, answered, isCorrect, handleAnswerClicked }) => {

    const [color, setColor] = useState("");
    const btnColors = ['blue', 'green', 'brown', 'orange'];
  
    useEffect(() => {
      if (!answered) {
        setColor(btnColors[Math.floor(Math.random() * btnColors.length)]);
      } else {
        if (isCorrect) {
          setColor("green");
        } else {
          setColor("red")
        }
      }
    }, [answered, isCorrect]);
  
    
  
    return (
      <TouchableOpacity
        onPress={() => handleAnswerClicked(item.id)}
        disabled={answered}
        style={{
          backgroundColor: color,
          justifyContent: 'center',
          padding: 15,
          width: '100%',
          alignItems: 'center',
          borderRadius: 10,
          margin: 3,
        }}>
        <AnswerText isCorrect={isCorrect} item={item} showAnswers={answered} />
      </TouchableOpacity>
    );
  };

  export default GameButton;