import React, { useState, useEffect, useCallback } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Button,
} from 'react-native';
import MyButton from './myButton';

import { FontAwesome } from '@expo/vector-icons';

import 'react-native-get-random-values';
import { v4 } from 'uuid';

const questions = [
  {
    text: 'How far is the Earth from the sun?',
    answers: [
      { text: '4 light years', id: v4() },
      { text: '93 million miles', id: v4() },
      { text: '1.3 billion miles', id: v4() },
      { text: '256,000 miles', id: v4() },
    ],
    correctAnswer: 2,
  },
  {
    text: 'What framework is this app made from?',
    answers: [
      { text: 'react', id: v4() },
      { text: 'react-native', id: v4() },
      { text: 'Xamarin', id: v4() },
      { text: 'Kotlin', id: v4() },
    ],
    correctAnswer: 2,
  },
  {
    text: 'What are you using rn?',
    answers: [
      { text: 'App', id: v4() },
      { text: 'Phone', id: v4() },
      { text: 'Expo', id: v4() },
      { text: 'Emulator', id: v4() },
    ],
    correctAnswer: 4,
  },
];

const AnswerText = ({ item, isCorrect, showAnswers }) => {
  if (showAnswers) {
    if (isCorrect) {
      return (
        <Text style={styles.text}>
          {item.text} <FontAwesome name="check" size={30} color="white" />
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {item.text} <FontAwesome name="times" size={30} color="white" />
        </Text>
      );
    }
  } else {
    return <Text style={styles.text}>{item.text}</Text>;
  }
};

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

/*
<MyButton text={item.text} color={color} width="100%" height={10} margin={3} padding={20} onPress={() => handleButtonPress(item.id)}/>
*/
const GameScreen = ({ navigation }) => {
  const [currQuestionNo, setCurrQuestionNo] = useState(0);

  const [question, setQuestion] = useState(questions[currQuestionNo]);
  const [gameOver, setGameOver] = useState(false);
  const [btnTitle, setBtnTitle] = useState("Next");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);


  useEffect(() => {
    setQuestion(questions[currQuestionNo]);
    navigation.setOptions({
      title: `Question ${currQuestionNo + 1}`,
    });
  }, [currQuestionNo, navigation]);


  const handleAnswerClicked = (itemID) => {
  
    setAnswered(true);


    if (itemID === question.answers[question.correctAnswer - 1].id) {
    
        setScore(currScore=>currScore+100)
    
    } else {
      setScore(currScore=>currScore - 40)
    }

  }
  const handleNextButtonPress = useCallback(() => {

    if (gameOver) {
      setScore(0);
      setCurrQuestionNo(0);
      setGameOver(false);
      setAnswered(false);
      setBtnTitle("Retry");


      return;
      
    }
    if (currQuestionNo === questions.length - 1) {
      setGameOver(true);
      setBtnTitle("Retry");

      return;
    }

    setBtnTitle("Next");


 

    setCurrQuestionNo((curr) => curr + 1);
    setAnswered(false)
  }, [currQuestionNo]);

  React.useLayoutEffect(() => {
    if (gameOver) {
      setBtnTitle("Retry")
    }
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View style={{ marginRight: 10}}>
          <Button
            onPress={() => handleNextButtonPress()}
            disabled={!answered}
            title={btnTitle}
            color="darkslateblue"
          />
        </View>
      ),
    });
  }, [navigation, setCurrQuestionNo, answered, handleNextButtonPress]);

  if (gameOver)
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            color: '#00ff00',
          }}>
          Game Over!
        </Text>
         <Text
          style={{
            fontSize: 40,
            color: '#00ff00',
          }}>
          Score: {score}
        </Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.scoreCard}>
          <Text style={styles.score}>Score: {score} </Text>
        </View>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      <View style={styles.answerButtons}>
        <FlatList
          data={question.answers}
          renderItem={({ item }) => (
            <GameButton
              item={item}
              answered={answered}
              handleAnswerClicked={handleAnswerClicked}
              isCorrect={item.id===question.answers[question.correctAnswer - 1].id}
            />
          )}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
};

GameScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'orange',
    flex: 1,
    padding: 20,
  },

  answerButtons: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end'
  },
  questionText: {
    flex: 5,
    fontSize: 30,
    color: 'white',
    marginTop: "40%",
    alignSelf: 'center',
  },
  scoreCard: {
    flex: 1,
    height: "5%",
    width: "30%",
    backgroundColor: "rgba(102, 102, 102, 0.8)",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end'
  },
  score: {
    fontSize: 14,
    color: "#7AFF85",
    fontWeight: "bold"
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
export default GameScreen;
