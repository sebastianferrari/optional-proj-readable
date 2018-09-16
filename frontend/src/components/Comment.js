import React from 'react'
import { Media } from 'react-bootstrap'
import './Comment.css'

export default function Comment(props) {
  return (
    <div className='comment-item'>
      {/* <h4>Comment</h4> */}

      <Media>
        <Media.Left>
          <div 
            className='comment-votescore'
            style={{ color: props.comment.voteScore < 0 ? 'red' : 'green' }}
          >{props.comment.voteScore}</div>
        </Media.Left>
        <Media.Body>
          <Media.Heading>{props.comment.author}</Media.Heading>
          <p>{props.comment.body}</p>
        </Media.Body>
      </Media>
    </div>
  )
}

// author: "thingtwo"
// body: "Hi there! I am a COMMENT."
// deleted: false
// id: "894tuq4ut84ut8v4t8wun89g"
// parentDeleted: false
// parentId: "8xf0y6ziyjabvozdd253nd"
// timestamp: 1468166872634
// voteScore: 6