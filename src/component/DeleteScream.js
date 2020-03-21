import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import CustomButton from "../util/CustomButton"

//MUI
import withStyles from "@material-ui/styles/withStyles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"

//Icon
import DeleteOutline from "@material-ui/icons/DeleteOutline"

// Redux
import { connect } from "react-redux"
import { deleteScream } from "../redux/actions/dataAction"

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
}

const DeleteScream = ({ classes, deleteScream, screamId }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteScream = () => {
    deleteScream(screamId)
  }
  return (
    <Fragment>
      <CustomButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  deleteScream: PropTypes.func.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
