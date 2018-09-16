import { showLoading, hideLoading } from 'react-redux-loading'
import {
  RECEIVE_COMMENTS
} from './actionTypes'
import { getAllPostComments } from '../utils/api';

function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function handleReceiveComments(postId) {
  return (dispatch) => {
    dispatch(showLoading())
    // console.log('FROM ACTION POSTID ===> ', postId)
    return getAllPostComments(postId)
      .then(comments => {
        // console.log({comments})
        dispatch(receiveComments(comments))
        dispatch(hideLoading())
      })
  }
}