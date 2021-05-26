import React from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/navigation/Drawer/Drawer";

class Layout extends React.Component {
  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer
          onClose={this.menuCloseHandler}
          isOpen={this.state.menu}/>
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