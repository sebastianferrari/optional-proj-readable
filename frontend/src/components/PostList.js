import React, { Component, Fragment } from 'react'
import { Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import PostPreview from './PostPreview'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './PostList.css'

class PostList extends Component {
  state = {
    sort: 'NewestFirst'
  }

  handleChange = (e) => {
    // console.log(e.target.value)
    const value = e.target.value

    this.setState({
      sort: value
    })
  }

  render() {
    const { posts } = this.props
    const { sort } = this.state

    if (posts.length === 0) {
      return (
        <div>NO POSTS</div>
      )
    }

    const sortedList = sort === 'NewestFirst'
      ? posts.sort((a, b) => b.timestamp - a.timestamp)
      : posts.sort((a, b) => b.voteScore - a.voteScore)

    return (
      <Fragment>
        <Row style={{ borderBottomColor: 'lightgray', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
          <Col xs={8}>
            <h3>Posts</h3>
          </Col>
          <Col xs={4} style={{ textAlign: 'right' }}>
            <Form inline>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel style={{ marginRight: 5 }}>Sort</ControlLabel>
                <FormControl componentClass="select" onChange={this.handleChange}>
                  <option value="NewestFirst">Newest First</option>
                  <option value="VoteScore">Vote Score</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {sortedList && 
          sortedList
            .filter(o => o.deleted === false)
            .map(post => (
              // todo: hide posts marked as deleted.
              <Link to={`/posts/${post.id}`} className='postlist-item' key={post.id}>
                <PostPreview post={post} />
              </Link>
            ))
        }
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, props) {
  if (props.category && props.category !== '') {
    posts = posts.filter(o => o.category === props.category)
  }

  return {
    posts
  }
}

export default connect(mapStateToProps)(PostList)