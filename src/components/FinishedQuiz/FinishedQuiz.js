import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";


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
        <Button onClick={props.onRetry} type='primary'>Again</Button>
        <Link to='/'>
          <Button type='success'>Go to list tests</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz