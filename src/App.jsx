import { useState } from "react";
import questions from "./questions";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const total = questions.length;
  const current = questions[currentQuestion];
  const percent = Math.round((score / total) * 100);

  const handleAnswer = (index) => {
    if (isAnswered || isFinished) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === current.correctAnswer) setScore(score + 1);
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (currentQuestion < total - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const getMessage = () => {
    if (percent === 100) return "Perfect score! Outstanding!";
    if (percent >= 70) return "Great job! Keep it up.";
    if (percent >= 40) return "Not bad, a little more practice!";
    return "Keep learning, you'll get there!";
  };

  return (
    <div className="card-container">
      {/* Top bar */}
      <div className="topbar">
        <h1>JavaScript Quiz</h1>
        <span className="score-badge">Score: {score}</span>
      </div>

      {!isFinished ? (
        <>
          {/* Progress */}
          <div className="progress-wrap">
            <div className="progress-label">
              <span>Question {currentQuestion + 1} of {total}</span>
              <span>{Math.round(((currentQuestion + 1) / total) * 100)}%</span>
            </div>
            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="question-box">
            <p>{current.question}</p>
          </div>

          {/* Options */}
          <ul className="questions">
            {current.options.map((option, index) => {
              let className = "";
              let icon = "";
              if (isAnswered) {
                if (index === current.correctAnswer) {
                  className = "correct";
                  icon = "✓";
                } else if (index === selectedAnswer) {
                  className = "incorrect";
                  icon = "✗";
                } else {
                  className = "dimmed";
                }
              }
              return (
                <li
                  key={index}
                  className={className}
                  onClick={() => handleAnswer(index)}
                >
                  <span className="option-letter">{LETTERS[index]}</span>
                  <span className="option-text">{option}</span>
                  <span className="option-icon">{icon}</span>
                </li>
              );
            })}
          </ul>

          <button className="btn" onClick={handleNext} disabled={!isAnswered}>
            {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </>
      ) : (
        <div className="result">
          <div className="result-circle" style={{ "--percent": percent }}>
            <div className="result-inner">
              <strong>{percent}%</strong>
              <span>{score}/{total}</span>
            </div>
          </div>
          <h2>Quiz Finished!</h2>
          <p className="result-message">{getMessage()}</p>

          <div className="result-stats">
            <div>
              <strong className="stat-correct">{score}</strong>
              <span>Correct</span>
            </div>
            <div>
              <strong className="stat-wrong">{total - score}</strong>
              <span>Wrong</span>
            </div>
          </div>

          <button className="btn" onClick={handleReset}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default App;