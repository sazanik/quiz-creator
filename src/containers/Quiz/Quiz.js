import React from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: '',
        answers: []
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
      loading: true
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data

      this.setState({
        quiz,
        loading: false,
      })

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.wrapper}>
          <h1>Answer all questions</h1>

          {
            this.state.loading
              ? <Loader/>
              : this.state.isFinished
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