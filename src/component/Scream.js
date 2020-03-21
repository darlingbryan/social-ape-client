import React, { Component } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"
import CustomButton from "../util/CustomButton"

//Component
import DeleteScream from "./DeleteScream"

//Redux
import { connect } from "react-redux"
import { likeScream, unlikeScream } from "../redux/actions/dataAction"

//MUI
import withStyles from "@material-ui/core/styles/withStyles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

//Icon
import ChatIcon from "@material-ui/icons/Chat"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
}

export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    )
      return true
    else return false
  }

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId)
  }

  render() {
    dayjs.extend(RelativeTime)
    const {
      classes,
      scream: {
        userImage,
        body,
        createdAt,
        userHandle,
        likeCount,
        commentCount,
        screamId
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props

    const likeButton = !authenticated ? (
      <CustomButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </CustomButton>
    ) : this.likedScream() ? (
      <CustomButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    )

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            {body} {likeCount}{" "}
          </Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { likeScream, unlikeScream })(
  withStyles(styles)(Scream)
)
