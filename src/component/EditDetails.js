import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import CustomButton from "../util/CustomButton"

//Redux
import { connect } from "react-redux"
import { editUserDetails } from "../redux/actions/userAction"

//MUI
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"

//Icon
import EditIcon from "@material-ui/icons/Edit"

const styles = theme => ({
  ...theme.pageStyles
})

export class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  }

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    })
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    }
    this.props.editUserDetails(userDetails)
    this.handleClose()
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.mapUserDetailsToState(this.props.credentials)
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    const { credentials } = this.props
    this.mapUserDetailsToState(credentials)
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <CustomButton
          tip="Edit details"
          placement="top"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <EditIcon color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle> Edit your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where our live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
})

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
)
