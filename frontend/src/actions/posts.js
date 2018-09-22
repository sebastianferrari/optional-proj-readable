import { 
  deletePost as apiDeletePost,
  editPost as apiEditPost,
  addPost as apiAddPost,
  votePost as apiVotePost
} from '../utils/api'
import {
  RECEIVE_POSTS, 
  DELETE_POST, 
  EDIT_POST,
  ADD_POST,
  VOTE_POST
} from './actionTypes'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function handleDeletePost(postId) {
  return (dispatch) => {
    return apiDeletePost(postId)
      .then(post => {
        dispatch(deletePost(post.id))
      })
  }
}

function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function handleEditPost(post) {
  return (dispatch) => {
    const obj = {
      title: post.title,
      body: post.body
    }
    return apiEditPost(post.id, obj)
      .then((post) => {
        dispatch(editPost(post))
      })
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function handleAddPost(post) {
  return (dispatch) => {
    return apiAddPost(post)
      .then(post => {
        dispatch(addPost(post))
      })
  }
}

function votePost(postId, voteScore) {
  return {
    type: VOTE_POST,
    postId,
    voteScore
  }
}

export function handleVotePost(postId, option) {
  return (dispatch) => {
    const obj = {
      option
    }
    return apiVotePost(postId, obj)
      .then(post => {
        dispatch(votePost(post.id, post.voteScore))
      })
  }
}