import React, { Component } from 'react'
import './PostPreview.css'
import { Badge, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getDateFromTimestamp } from '../utils/helpers'

class Post extends Component {
  render() {
    const post = this.props.post

    const catTooltip = (
      <Tooltip id='category-tootip'>
        Category
      </Tooltip>
    )

    const authorTooltip = (
      <Tooltip id='author-tooltip'>
        Author
      </Tooltip>
    )

    const date = getDateFromTimestamp(post.timestamp)

    return (
      <Row className='postpreview-container'>
        <Col md={12}>
          <Row>
            <Col xs={9} sm={10}>
              <h2>{post.title}</h2>
            </Col>
            <Col xs={3} sm={2}>
              <div className='postpreview-timestamp'>
                {date}
              </div>
            </Col>
          </Row>
          <p className='postpreview-body'>{post.body.length > 400 ? post.body.substring(0, 397) + '...' : post.body}</p>

          <Row className='postpreview-footer'>
            <Col sm={3}>
              <Badge
                style={{ backgroundColor: 'lightblue', color: 'black' }}
              >{post.commentCount}</Badge> comments
            </Col>
            <Col sm={3}>
              <OverlayTrigger placement='top' overlay={catTooltip}>
                <div>{post.category}</div>
              </OverlayTrigger>
            </Col>
            <Col sm={3}>
              <OverlayTrigger placement='top' overlay={authorTooltip}>
                <div>{post.author}</div>
              </OverlayTrigger>
            </Col>
            <Col sm={3}>
              Vote score <Badge
                style={ post.voteScore < 0
                  ? { backgroundColor: 'salmon' }
                  : { backgroundColor: 'lightgreen', color: 'black' } }
              >{post.voteScore}</Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Post