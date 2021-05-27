import React from "react";
import classes from './Drawer.module.css'
import {NavLink} from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {connect} from "react-redux";


class Drawer extends React.Component {

  clickHandler = () => this.props.onClose()


  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>

        </li>
      )
    })
  }

  render() {
    console.log('Auth', this.props.isAuthenticated)
    const cls = [classes.Drawer]
    const links = [{to: '/', label: 'List', exact: true}]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create test', exact: false})
      links.push({to: '/logout', label: 'Logout', exact: false})

    } else {
      links.push({to: '/auth', label: 'Auth', exact: false})
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </>

    )
  }

}

export default connect()(Drawer)