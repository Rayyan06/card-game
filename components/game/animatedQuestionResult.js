import React, {useEffect, useRef} from 'react';
import { Animated, Text, View, StyleSheet } from "react-native";
import styles from "../styles"

const AnimatedQuestionResult = ({ isCorrect }) => {
    const dropInAnim = useRef(new Animated.Value(-60)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(
                dropInAnim, 
                {
                    useNativeDriver: false, // Add This line
                    toValue: 0,
                    duration: 10000
                },

            ),
            Animated.spring(
                dropInAnim,
                {
                    useNativeDriver: false,
                    toValue: -60,
                    duration: 10000,
                }
            )
        
            ]).start()
    }, [dropInAnim])

    return (
    <Animated.View style={{...styles.container, ...thisStyles.box, top: dropInAnim}}>
        <Text style={styles.text}>Hello</Text>
    </Animated.View>
    )
}

const thisStyles = StyleSheet.create({
    box: {
        padding: 10,
        height: 60,
        backgroundColor: "blue", 
    } 
})
export default AnimatedQuestionResult
