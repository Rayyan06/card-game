
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
    {
      text: 'O',
      answers: [
        {text: 'OO', id: v4() },
        {text:'1', id: v4() },
        {text:'11', id: v4() },
        {text:'.', id: v4() },
       ],
      correctAnswer: 2
    }
  ];

export default questions;