import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FloatingScreen = ({ isVisible, toggleVisibility, content, hints, questions }) => {
  const [view, setView] = useState('image');
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  if (!isVisible) return null;

  const handleQuestionAnswer = (option) => {
    if (questions && option === questions[currentQuestionIndex].correctAnswer) {
      setIsCorrect(true);
      setIsIncorrect(false);
      setTimeout(() => setIsCorrect(false), 3000); // Time delay before resetting
    } else {
      setIsIncorrect(true);
      setIsCorrect(false);
      setTimeout(() => setIsIncorrect(false), 3000); // Time delay before resetting
    }
  };

  const renderHint = (hint) => {
    if (!hint) return <Text style={styles.hintDescription}>No hint available.</Text>; // Return a fallback message if hint is undefined

    const splitIndex = hint.indexOf(':');  // Find the index of the first colon
    if (splitIndex === -1) { // Check if no colon is found
      return <Text style={styles.hintDescription}>{hint}</Text>; // Return the whole hint if no specific format is found
    }

    const title = hint.substring(0, splitIndex + 1); // Get the "Hint X:" part
    const description = hint.substring(splitIndex + 2); // Get the rest of the hint, skip space after colon

    return (
      <>
        <Text style={styles.hintTitle}>{title.trim()}</Text>
        <Text style={styles.hintDescription}>{description.trim()}</Text>
      </>
    );
  };

  return (
    <View style={styles.floatingScreen}>
      <TouchableOpacity onPress={toggleVisibility} style={styles.closeButton}>
        <FontAwesome name="times" size={24} color="#ffffff" />
      </TouchableOpacity>
      
      {view !== 'image' && (
        <TouchableOpacity onPress={() => setView('image')} style={styles.backToImageButton}>
          <FontAwesome name="image" size={24} color="#ffffff" />
        </TouchableOpacity>
      )}

      {view === 'image' && (
        <>
          <TouchableOpacity onPress={() => setView('hints')} style={styles.toggleViewButton}>
            <FontAwesome name="lightbulb-o" size={24} color="#ffffff" />
          </TouchableOpacity>
          {questions && questions.length > 0 && (
            <TouchableOpacity onPress={() => setView('questions')} style={styles.toggleViewButton}>
              <FontAwesome name="question" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          {content}
        </>
      )}

      {view === 'hints' && (
        <View style={styles.projectHints}>
          <TouchableOpacity onPress={() => setCurrentHintIndex((currentHintIndex - 1 + hints.length) % hints.length)} style={styles.hintNavButton}>
            <FontAwesome name="chevron-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentHintIndex((currentHintIndex + 1) % hints.length)} style={styles.hintNavButton}>
            <FontAwesome name="chevron-right" size={24} color="#ffffff" />
          </TouchableOpacity>
          {hints && hints.length > currentHintIndex ? renderHint(hints[currentHintIndex]) : <Text style={styles.hintDescription}>No hint available.</Text>}
        </View>
      )}

      {view === 'questions' && questions && questions.length > 0 && (
        <View style={styles.projectQuestions}>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].questionText}</Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => handleQuestionAnswer(option)} style={styles.questionOption}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          {isCorrect && <Text style={styles.correctAnswer}>🌟 Spectacular! You nailed it! 🌟</Text>}
          {isIncorrect && <Text style={styles.incorrectAnswer}>🔍 Almost there! Let's give it another shot! 🔍</Text>}
        </View>
      )}
    </View>
  );
};

export default FloatingScreen;

const styles = StyleSheet.create({
  floatingScreen: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    width: 300,
    maxHeight: '90%',
    backgroundColor: '#20666b',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  backToImageButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  toggleViewButton: {
    position: 'absolute',
    top: 10,
    right: 50,
  },
  projectHints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectQuestions: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  questionOption: {
    backgroundColor: '#20666b',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  correctAnswer: {
    color: '#00ff00',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  incorrectAnswer: {
    color: '#ff6347',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hintTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#ffd700',
  },
  hintDescription: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  hintNavButton: {
    marginHorizontal: 10,
  },
});
