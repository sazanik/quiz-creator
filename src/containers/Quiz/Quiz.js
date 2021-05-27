import React from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, quizRetry} from "../../redux/actions/quiz";

class Quiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.quizRetry()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.wrapper}>
          <h1>Answer all questions</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              : this.props.isFinished
              ? <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.quizRetry}
              />
              : <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion].question}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />

          }

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    quizRetry: () => dispatch(quizRetry()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)