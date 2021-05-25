import React from "react";
import classes from "./FinishedQuiz.module.css";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') total++
    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((item, index) => {
          const cls = [
            'fa',
            props.results[item.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[item.id]]]
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {item.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        })}
      </ul>

      <p>Correct is {successCount} of {props.quiz.length}</p>
      <div>
        <button
          onClick={props.onRetry}>Again</button>
      </div>
    </div>
  )
}

export default FinishedQuiz