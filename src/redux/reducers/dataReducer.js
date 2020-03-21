import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM
} from "../types"

const initialState = {
  scream: {},
  screams: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_SCREAMS:
      return {
        ...state,
        loading: false,
        screams: action.payload
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      )
      state.screams[index] = action.payload
      return {
        ...state
      }
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(scream => scream.id !== action.payload)
      }
    default:
      return state
  }
}
