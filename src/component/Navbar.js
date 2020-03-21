import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// Redux
import { connect } from "react-redux"

//MUI
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import CustomButton from "../util/CustomButton"

//Icons
import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {this.props.authenticated ? (
            <Fragment>
              <CustomButton tip="Post a scream!">
                <AddIcon />
              </CustomButton>

              <Link to="/">
                <CustomButton tip="Home">
                  <HomeIcon />
                </CustomButton>
              </Link>
              <CustomButton tip="Notifications">
                <Notifications />
              </CustomButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({ authenticated: state.user.authenticated })

export default connect(mapStateToProps)(Navbar)
