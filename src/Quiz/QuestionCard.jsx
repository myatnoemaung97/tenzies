import { nanoid } from "nanoid";

export default function ({ quiz, chooseAnswer }) {
    const answers = [...quiz.incorrect_answers, quiz.correct_answer];
    answers.sort();

    function getAnswerStyle(answer) {
        if (quiz.chosen_answer && answer === quiz.correct_answer) {
            return { backgroundColor: 'green', color: 'white' }
        } else if (answer === quiz.chosen_answer && answer !== quiz.correct_answer) {
            return { backgroundColor: 'red', color: 'white' }
        } else {
            return { backgroundColor: 'white' }
        }
    }

    const answerElements = answers.map((a) => (
        <button disabled={quiz.chosen_answer}
            style={getAnswerStyle(a)}
            onClick={() => chooseAnswer(quiz.id, a)}
            className="py-2 px-3 rounded-2"
            key={nanoid()}>
            <span dangerouslySetInnerHTML={{ __html: a }}></span>
        </button>
    ));

    let questionElement = '';

    if (quiz.chosen_answer && quiz.chosen_answer === quiz.correct_answer) {
        questionElement = (
            <>
                <p className="text-white" dangerouslySetInnerHTML={{ __html: quiz.question }}></p>
                <h3 className="text-success text-center">Correct!</h3>
            </>
        )
    } else if (quiz.chosen_answer && quiz.chosen_answer !== quiz.correct_answer) {
        questionElement = (
            <>
                <p className="text-white" dangerouslySetInnerHTML={{ __html: quiz.question }}></p>
                <h3 className="text-danger text-center">Wrong!</h3>
            </>
        )
    } else if (!quiz.chosen_answer) {
        questionElement = <p className="text-white" dangerouslySetInnerHTML={{ __html: quiz.question }}></p>
    }

    return (
        <div className="--quiz-card border border-black shadow rounded-3 bg-dark mb-3 p-3">
            {questionElement}
            <div className="d-flex justify-content-start gap-3 text-white">
                {answerElements}
            </div>
        </div>
    )
}