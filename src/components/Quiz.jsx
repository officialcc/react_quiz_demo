// import { useState, useCallback, useRef } from "react"; // useRef no longer used here after cutting out Answers into its own component
import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
// import QuestionTimer from "./QuestionTimer.jsx"; //  } Not needed here directly; imported via import of Question.jsx
// import Answers from "./Answers.jsx"; //              } Not needed here directly; imported via import of Question.jsx
import Question from "./Question.jsx";
// import quizCompleteImg from '../assets/quiz-complete.png'
import Summary from "./Summary.jsx";

export default function Quiz() {
    // const [answerState, setAnswerState] = useState('');
    // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); <- Unnecessary; can be derived from userAnswers/setUserAnswers
    const [userAnswers, setUserAnswers] = useState([]);

    // const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length -1;
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer) {
            // setAnswerState('answered');
            setUserAnswers((prevUserAnswers) => {
                return [...prevUserAnswers, selectedAnswer];
        });

        // setTimeout(() => {
        //     if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        //         setAnswerState('correct');
        //     } else {
        //         setAnswerState('wrong');
        //     }
            
        //     setTimeout(() => {
        //         setAnswerState('');
        //     }, 2000);
        // }, 1000);
    // }, [activeQuestionIndex]);
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    
    if (quizIsComplete) {
        return (
            // <div id="summary">
            //     <img src={quizCompleteImg} alt="Quiz Completed!" />
            //     <h2>Quiz Completed!</h2>
            // </div>
            <Summary userAnswers={userAnswers} />
        );
    }    

    return (
        <div id="quiz">
            <div id="question">
                {/* <Question key={activeQuestionIndex} questionText={QUESTIONS[activeQuestionIndex].text} answers={QUESTIONS[activeQuestionIndex].answers} answerState={answerState} selectedAnswer={userAnswers[userAnswers.length - 1]} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer} /> */}
                <Question key={activeQuestionIndex} index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer} />
            </div>
        </div>
    );
}