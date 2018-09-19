import { 
  deletePost as apiDeletePost,
  editPost as apiEditPost
} from '../utils/api'
import {
  RECEIVE_POSTS, 
  DELETE_POST, 
  EDIT_POST
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