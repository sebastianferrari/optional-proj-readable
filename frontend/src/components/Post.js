import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { getDateFromTimestamp } from '../utils/helpers'
import { Badge } from 'react-bootstrap'
import PostComments from './PostComments'

class Post extends Component {
  render() {
    const { post } = this.props
    console.log({ post })

    if (!post) {
      return (
        <h4>NO POST</h4>
      )
    }

    return (
      <Fragment>
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <h2>{post.title}</h2>
            <p style={{ padding: 20 }}>{post.body}</p>

            <Row style={{ marginBottom: 30 }}>
              <Col sm={4}>
                Author: <strong>{post.author}</strong>
              </Col>
              <Col sm={4}>
                {getDateFromTimestamp(post.timestamp)}
              </Col>
              <Col sm={4}>
                Vote Score <Badge
                  style={post.voteScore < 0
                    ? { backgroundColor: 'salmon' }
                    : { backgroundColor: 'lightgreen', color: 'black' }}
                >{post.voteScore}</Badge>
              </Col>
            </Row>
          </Col>
        </Row>

        <PostComments postId={post.id} />
      </Fragment>
    )
  }
}

// should list all of the comments for that post
// should have controls to edit or delete the post
// should have a control to add a new comment.
// implement comment form however you want (inline, modal, etc.)
// comments should also have controls for editing or deleting

function mapStateToProps({ posts }, props) {
  const { postId } = props.match.params
  // console.log({postId})

  return {
    post: posts.filter(o => o.id === postId)[0]
  }
}

export default connect(mapStateToProps)(Post)