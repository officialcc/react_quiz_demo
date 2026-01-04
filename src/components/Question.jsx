import { useState } from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from '../questions.js';

// export default function Question({key, questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
// export default function Question({key, onSelectAnswer, onSkipAnswer}) { <-- Cannot use key as a prop
export default function Question({index, onSelectAnswer, onSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
            selectedAnswer: answer,
            isCorrect: QUESTIONS[index].answers[0] === answer
        })

        setTimeout(() => {
            onSelectAnswer(answer);
        }, 2000);
        }, 1000);
    }

    let answerState ='';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            {/* <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={onSkipAnswer} /> */}
            <QuestionTimer key={timer} timeout={timer} onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState} />
            {/* <h2>{QUESTIONS[activeQuestionIndex].text}</h2> */}
            {/* <h2>{questionText}</h2> */}
            <h2>{QUESTIONS[index].text}</h2>
            {/* <Answers key={activeQuestionIndex} answers={QUESTIONS[activeQuestionIndex].answers} selectedAnswer={userAnswers[userAnswers.length - 1]} answerState={answerState} onSelect={handleSelectAnswer} /> */}
            {/* <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelectAnswer} /> */}
            <Answers answers={QUESTIONS[index].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
        </div>
    )
}