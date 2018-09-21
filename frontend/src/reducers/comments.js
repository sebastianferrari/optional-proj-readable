import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT
} from '../actions/actionTypes'
import { updateCommentObjectInArray } from '../utils/helpers'

export default function comments(state = [], action) {
  // console.log('STATE FROM REDUCER ', state)
  // console.log('ACTION FROM REDUCER ', action)
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return [
        //...state, This is temporal because in a real scenario 
        // I need to replace just only existing items that
        // were been modified. 
        ...action.comments
      ]

    case ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]

    case DELETE_COMMENT:
      return [
        ...state.filter(o => o.id !== action.commentId)
      ]

    case EDIT_COMMENT:
      return updateCommentObjectInArray(state, action.comment)

    default:
      return state
  }
}