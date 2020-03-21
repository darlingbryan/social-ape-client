import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { PropTypes } from "prop-types"

//Redux
import { connect } from "react-redux"
import { getScreams } from "../redux/actions/dataAction"

//Components
import Scream from "../component/Scream"
import Profile from "../component/Profile"

export class home extends Component {
  componentDidMount() {
    this.props.getScreams()
  }
  render() {
    const { screams, loading } = this.props.data

    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
    ) : (
      <p>loading...</p>
    )
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams })(home)
