import React, { useState, useEffect, useCallback } from 'react';

import GameButton from "./game/gameBtn";
import questions from '../data/questions'
import AnimatedQuestionResult from "./game/animatedQuestionResult"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';


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
      <AnimatedQuestionResult />

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
