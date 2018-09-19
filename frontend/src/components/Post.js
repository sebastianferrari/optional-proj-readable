import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { getDateFromTimestamp } from '../utils/helpers'
import { Badge } from 'react-bootstrap'
import PostComments from './PostComments'
import { Link, Redirect } from 'react-router-dom'
import './Post.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { handleDeletePost } from '../actions/posts';

class Post extends Component {
  state = {
    redirectToHome: false
  }

  handleDelete = () => {
    const { post, dispatch } = this.props

    confirmAlert({
      title: 'Deleting Post...',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(handleDeletePost(post.id))
            this.setState({
              redirectToHome: true
            })
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to='/' />
    }

    const { post } = this.props
    console.log({ post })

    if (!post) {
      return (
        <h4>NO POST</h4>
      )
    }

    return (
      <Fragment>
        <div className='post-buttons'>
          <Link to={`/post/edit/${post.id}`}>
            <Glyphicon glyph='edit' title='Edit Post' />
          </Link>
          <a role='button' onClick={this.handleDelete}>
            <Glyphicon glyph='trash' title='Delete Post' />
          </a>
        </div>

        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <h2>{post.title}</h2>
            <p style={{ padding: 20, fontSize: 'large' }}>{post.body}</p>

            <Row className='post-footer'>
              <Col xs={4}>
                Author: <strong>{post.author}</strong>
              </Col>
              <Col xs={4} style={{ textAlign: 'center' }}>
                {getDateFromTimestamp(post.timestamp)}
              </Col>
              <Col xs={4} style={{ textAlign: 'right' }}>
                Vote Score <Badge
                  style={post.voteScore < 0
                    ? { backgroundColor: 'salmon' }
                    : { backgroundColor: 'lightgreen', color: '#555' }}
                  className='post-footer-votescore'
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

// should have a control to add a new comment.
// implement comment form however you want (inline, modal, etc.)
// comments should also have controls for editing or deleting

function mapStateToProps({ posts }, props) {
  const { postId } = props.match.params

  return {
    post: posts.filter(o => o.id === postId)[0]
  }
}

export default connect(mapStateToProps)(Post)