import {
  RECEIVE_POSTS, 
  DELETE_POST,
  EDIT_POST,
  ADD_POST,
  VOTE_POST,
  ADD_COMMENT_TO_POST,
  DELETE_COMMENT_FROM_POST
} from '../actions/actionTypes'
import { updatePostObjectInArray } from '../utils/helpers'

export default function posts(state = [], action) {
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

    case VOTE_POST:
      return state.map(item => {
        if (item.id !== action.postId) {
            return item;
        }
        const { voteScore } = action
        return {
            ...item,
            voteScore
        };    
      });

    case ADD_COMMENT_TO_POST:
      return state.map(item => {
        if (item.id !== action.postId) {
            return item;
        }
        const commentCount = item.commentCount + 1
        return {
            ...item,
            commentCount
        };    
      });

      case DELETE_COMMENT_FROM_POST:
      return state.map(item => {
        if (item.id !== action.postId) {
            return item;
        }
        const commentCount = item.commentCount - 1
        return {
            ...item,
            commentCount
        };    
      });
  
    default:
      return state
  }
}