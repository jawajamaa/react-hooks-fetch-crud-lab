import React, { useState } from "react";

function QuestionForm({ baseUrl, onHandleSubmit }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: [
       "",
       "",
       "",
       "",
    ],
    correctIndex: 0,
  });
  console.log(formData);
  console.log(formData.answers[0]);

  // const [formData, setFormData] = useState({
  //   prompt: "",
  //   answer1: "",
  //   answer2: "",
  //   answer3: "",
  //   answer4: "",
  //   correctIndex: 0,
  // });

  function handleChange(event) {
    const { name, value } = event.target;

    if(name.startsWith("answer")) {
      const index =parseInt(name.charAt(name.length - 1), 10) -1;
      setFormData({
        ...formData,
        answers: formData.answers.map((ans, i) => (i === index ? value : ans)),
      });
    } else {
        setFormData({
          ...formData,
          [name]: value,
        });
    }
  }

  // function handleChange(event) {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      // below body: works to update db.json, but browser errors as the answers are not in an array. change to {"answers": ["string", "string", "string","string"]  }??
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: formData.correctIndex,
        // "prompt": "string",
        // "answers": [
        //   "string",
        //   "string",
        //   "string",
        //   "string",
        // ],
        // "correctIndex": "integer"
        // "prompt": "string",
        // "answers": "array of strings",
        // "correctIndex": "integer"
      })
    })
      .then((r) => r.json())
      .then((newQuestion) => onHandleSubmit(newQuestion))
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answers[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answers[1]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answers[2]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answers[3]}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answers[0]}</option>
            <option value="1">{formData.answers[1]}</option>
            <option value="2">{formData.answers[2]}</option>
            <option value="3">{formData.answers[3]}</option>
            {/* <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option> */}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
