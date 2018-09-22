import { showLoading, hideLoading } from 'react-redux-loading'
import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT
} from './actionTypes'
import { 
  getAllPostComments,
  addComment as apiAddComment,
  deleteComment as apiDeleteComment,
  editComment as apiEditComment,
  voteComment as apiVoteComment
} from '../utils/api';
import { addCommentToPost, deleteCommentFromPost } from './posts';

function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function handleReceiveComments(postId) {
  return (dispatch) => {
    dispatch(showLoading())
    return getAllPostComments(postId)
      .then(comments => {
        dispatch(receiveComments(comments))
        dispatch(hideLoading())
      })
  }
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function handleAddComment(comment) {
  return (dispatch) => {
    return apiAddComment(comment)
      .then(comment => {
        dispatch(addComment(comment))
        dispatch(addCommentToPost(comment.parentId))
      })
  }
}

function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function handleDeleteComment(commentId) {
  return (dispatch) => {
    return apiDeleteComment(commentId)
      .then(comment => {
        dispatch(deleteComment(comment.id))
        dispatch(deleteCommentFromPost(comment.parentId))
      })
  }
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function handleEditComment(comment) {
  return (dispatch) => {
    const obj = {
      title: comment.timestamp,
      body: comment.body
    }
    return apiEditComment(comment.id, obj)
      .then((comment) => {
        dispatch(editComment(comment))
      })
  }
}

function voteComment(commentId, voteScore) {
  return {
    type: VOTE_COMMENT,
    commentId,
    voteScore
  }
}

export function handleVoteComment(commentId, option) {
  return (dispatch) => {
    const obj = {
      option
    }
    return apiVoteComment(commentId, obj)
      .then(comment => {
        dispatch(voteComment(comment.id, comment.voteScore))
      })
  }
}