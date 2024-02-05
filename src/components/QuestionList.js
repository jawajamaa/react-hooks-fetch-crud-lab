import React, {useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ quizQuestions, setQuizQuestions }) {

console.log(quizQuestions);

  const questionsToDisplay = quizQuestions.map(question => (
    <QuestionItem 
    key = { question.id}
    question = { question }
    />
    ))
    
  return (
    <section>
      <h1>Quiz Questions</h1>
        <ul>{ questionsToDisplay }</ul>
    </section>
  );
}

export default QuestionList;
