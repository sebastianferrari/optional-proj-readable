import React, { Component } from 'react'
import './PostPreview.css'
import { Badge, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'

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

    return (
      <Row className='postpreview-container'>
        <Col md={12}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>

          <Row className='postpreview-footer'>
            <Col sm={3}>
              <Badge>{post.commentCount}</Badge> comments
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
              Vote score <Badge>{post.voteScore}</Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Post