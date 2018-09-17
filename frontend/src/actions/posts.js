import { deletePost as apiDeletePost } from '../utils/api'
import {
  RECEIVE_POSTS, DELETE_POST
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
    //console.log('FROM ACTION POSTID ===> ', postId)
    return apiDeletePost(postId)
      .then(post => {
        //console.log(post.id)
        dispatch(deletePost(post.id))
      })
  }
}