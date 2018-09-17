import React from 'react'
import { Media, Row, Col } from 'react-bootstrap'
import './Comment.css'
import { getDateFromTimestamp } from '../utils/helpers'

export default function Comment(props) {
  return (
    <div 
      className='comment-item'
      style={{ 
        backgroundColor: props.comment.voteScore < 0
          ? 'rgba(255,0,0,.05)'
          : 'rgba(0,255,0,.05)'
      }}
    >
      <Row>
        <Col xs={9} sm={10}>
          <Media>
            <Media.Left>
              <div
                className='comment-votescore'
                style={{ color: props.comment.voteScore < 0 ? 'red' : 'green' }}
              >{props.comment.voteScore}</div>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{props.comment.author} <span style={{ fontSize: 'small' }}>said:</span></Media.Heading>
              <p>{props.comment.body}</p>
            </Media.Body>
          </Media>
        </Col>
        <Col xs={3} sm={2} className='comment-date'>
          {getDateFromTimestamp(props.comment.timestamp)}
        </Col>
      </Row>
    </div>
  )
}

// id: "894tuq4ut84ut8v4t8wun89g"
// parentId: "8xf0y6ziyjabvozdd253nd"
// timestamp: 1468166872634
// voteScore: 6