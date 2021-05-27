import React from "react";
import './App.css'
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {autoLogin} from "./redux/actions/auth";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import Logout from "./components/Logout/Logout";

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' exact component={QuizList}/>
        <Redirect to='/'/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' exact component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={QuizList}/>
          <Redirect to='/quiz-creator'/>
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))