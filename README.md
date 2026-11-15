Quiz App

A responsive multiple-choice quiz app built with React. Answer one question at a time, get instant feedback, and see your final score at the end.

Features

Progress bar and live score
Green/red feedback on answers
Result screen with score ring
Try Again button
Fully responsive (mobile, tablet, desktop)
Run Locally
bash
npm install
npm run dev

Open the URL shown in the terminal (usually http://localhost:5173).

Add Questions

Edit src/questions.js:

js
{
  question: "Which keyword declares a block-scoped variable?",
  options: ["var", "let", "function", "define"],
  correctAnswer: 1, // index of the correct option
}
Tech

React, CSS