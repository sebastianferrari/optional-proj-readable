import React, { Component } from 'react'
import './PostPreview.css'
import {
  Badge,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  ButtonToolbar,
  Glyphicon,
  Button
} from 'react-bootstrap'
import { getDateFromTimestamp } from '../utils/helpers'
import { handleVotePost } from '../actions/posts'
import { connect } from 'react-redux'

class PostPreview extends Component {
  handleUpVote = (e) => {
    e.preventDefault()
    const option = 'upVote'
    this.vote(option)
  }

  handleDownVote = (e) => {
    e.preventDefault()
    const option = 'downVote'
    this.vote(option)
  }

  vote = (option) => {
    const { post } = this.props

    this.props.votePost(post.id, option)
  }

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

          <Row>
            <Col xs={9} sm={10}>
              <p className='postpreview-body'>{post.body.length > 400 ? post.body.substring(0, 397) + '...' : post.body}</p>
            </Col>
            <Col xs={3} sm={2} style={{ textAlign: 'center' }}>
              <ButtonToolbar>
                <Button bsSize='small' onClick={this.handleUpVote}><Glyphicon glyph='thumbs-up' /></Button>
                <Button bsSize='small' onClick={this.handleDownVote}><Glyphicon glyph='thumbs-down' /></Button>
              </ButtonToolbar>
            </Col>
          </Row>

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
                style={post.voteScore < 0
                  ? { backgroundColor: 'salmon' }
                  : { backgroundColor: 'lightgreen', color: 'black' }}
              >{post.voteScore}</Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    votePost: (postId, option) => dispatch(handleVotePost(postId, option))
  }
}

export default connect(null, mapDispatchToProps)(PostPreview)