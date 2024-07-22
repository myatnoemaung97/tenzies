import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

const URL = 'https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy';

export default function () {
    const [quizes, setQuizes] = useState([]);
    const [score, setScore] = useState(0);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        // const getQuizes = async () => {
        //     const response = await fetch(URL);
        //     const data = await response.json();
        //     let results = data.results;
        //     if (results) {
        //         results = results.map(result => ({ ...result, chosen_answer: '', id: nanoid() }));
        //         setQuizes(results);
        //     }
        // }

        const getQuizes = () => {
            fetch(URL).then(res => res.json())
                .then(data => {
                    let results = data.results;
                    if (results) {
                        results = results.map(result => ({ ...result, chosen_answer: '', id: nanoid() }));
                        setQuizes(results);
                    }
                })
        }

        const timeOut = setTimeout(() => {
            getQuizes();
        }, 5000)

        return () => clearTimeout(timeOut);
    }, [])

    useEffect(() => {
        if (quizes.length > 0) {
            const score = quizes.filter(quiz => quiz.chosen_answer === quiz.correct_answer).length;
            setScore(score);
        }
    }, [quizes])

    function chooseAnswer(quizId, chosenAswer) {
        setQuizes(prevQuizes => prevQuizes.map(quiz => quiz.id === quizId ? { ...quiz, chosen_answer: chosenAswer } : quiz));
        if (currentQuiz == quizes.length - 1) {
            setTimeout(() => {
                setFinished(true);
            }, 3000)
        } else {
            setTimeout(() => {
                setCurrentQuiz(prevCurrentQuiz => prevCurrentQuiz + 1);
            }, 3000);
        }
    }

    if (!quizes || quizes.length === 0) {
        return <h1>loading...</h1>
    }

    if (finished) {
        return (
            <div className="text-white text-center mt-4">
                <h1 className="text-center text-white">Quiz</h1>
                <h2 className="--sub-title">Your score: {score} <span className="ms-1"></span></h2>
            </div>
        )
    }

    const questionCard = <QuestionCard chooseAnswer={chooseAnswer} key={quizes[currentQuiz].id} quiz={quizes[currentQuiz]} />

    return (
        <>
            <h1 className="text-center text-white">Quiz</h1>
            {questionCard}
        </>
    );
}
