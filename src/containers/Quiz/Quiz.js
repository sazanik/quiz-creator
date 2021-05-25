import React from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'What color is the sky?',
        id: 1,
        rightAnswerId: 3,
        answers: [
          {text: 'Black', id: 1},
          {text: 'White', id: 2},
          {text: 'Blue', id: 3},
          {text: 'Azure', id: 4},
        ]
      },
      {
        question: 'What is the year now?',
        id: 2,
        rightAnswerId: 4,
        answers: [
          {text: '2012', id: 1},
          {text: '1221', id: 2},
          {text: '2020', id: 3},
          {text: '2021', id: 4},
        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const value = Object.values(this.state.answerState)[0]
      if (value === 'success') return
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({isFinished: true})
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout((timeout))
      }, 1000)

    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })

    }

  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.wrapper}>
          <h1>Answer all questions</h1>
          {this.state.isFinished
            ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
            : <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          }

        </div>
      </div>
    )
  }
}

export default Quiz