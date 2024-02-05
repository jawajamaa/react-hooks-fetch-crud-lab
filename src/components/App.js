import React, {useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[ quizQuestions, setQuizQuestions ] = useState([]);

  const baseUrl = "http://localhost:4000/questions";


  useEffect(() => {
    fetch(baseUrl)
      .then((r) => r.json())
      .then((questions) => setQuizQuestions(questions));
      // .then((questions) => console.log(questions));
  }, [])

    function onHandleSubmit(newQuestion) {
console.log(newQuestion)
    }

  return (
    <main>
      <AdminNavBar 
      onChangePage={setPage} 
      />
      {page === "Form" ? 
      <QuestionForm 
      baseUrl = { baseUrl }
      onHandleSubmit = { onHandleSubmit }
      /> : 
      <QuestionList
      quizQuestions = { quizQuestions }
      setQuizQuestions = { setQuizQuestions } 
      />}
    </main>
  );
}

export default App;
