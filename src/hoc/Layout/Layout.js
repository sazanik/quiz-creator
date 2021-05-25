import React from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/navigation/MenuToggle/MenuToggle";

class Layout extends React.Component {
  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    console.log(this.state)
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenuHandler}
        />
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout