import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon, Badge, ButtonToolbar, Button } from 'react-bootstrap'
import { getDateFromTimestamp } from '../utils/helpers'
import PostComments from './PostComments'
import { Link, Redirect } from 'react-router-dom'
import './Post.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { handleDeletePost, handleVotePost } from '../actions/posts';

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
    if (this.state.redirectToHome) {
      return <Redirect to='/' />
    }

    const { post } = this.props

    if (!post) {
      return (
        <h4>NO POST</h4>
      )
    }

    return (
      <Fragment>
        <ButtonToolbar className='pull-right'>
          <Button bsSize='xsmall' onClick={this.handleUpVote}><Glyphicon glyph='thumbs-up' /></Button>
          <Button bsSize='xsmall' onClick={this.handleDownVote}><Glyphicon glyph='thumbs-down' /></Button>
          <Link to={`/post/edit/${post.id}`} style={{ padding: 10}}>
            <Glyphicon glyph='edit' title='Edit Post' />
          </Link>
          <a role='button' onClick={this.handleDelete}>
            <Glyphicon glyph='trash' title='Delete Post' />
          </a>
        </ButtonToolbar>

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

const mapDispatchToProps = dispatch => {
  return {
    votePost: (postId, option) => dispatch(handleVotePost(postId, option))
  }
}

function mapStateToProps({ posts }, props) {
  const { postId } = props.match.params

  return {
    post: posts.filter(o => o.id === postId)[0]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)