import {
  RECEIVE_POSTS, 
  DELETE_POST,
  EDIT_POST,
  ADD_POST
} from '../actions/actionTypes'
import { updatePostObjectInArray } from '../utils/helpers'

export default function posts(state = [], action) {
  // console.log('FROM REDUCER ', action.post)
  switch (action.type) {
    case RECEIVE_POSTS:
      return [
        ...state,
        ...action.posts
      ]
    
    case DELETE_POST:
      return [
        ...state.filter(o => o.id !== action.postId)
      ]

    case EDIT_POST:
      return updatePostObjectInArray(state, action.post)

    case ADD_POST:
      return [
        ...state,
        action.post
      ]
  
    default:
      return state
  }
}