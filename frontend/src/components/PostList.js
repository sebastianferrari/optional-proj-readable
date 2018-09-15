import React, { Component, Fragment } from 'react'
import { Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import PostPreview from './PostPreview'

class PostList extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col xs={8}>
            <h3>Posts</h3>
          </Col>
          <Col xs={4} style={{ textAlign: 'right' }}>
            <Form inline>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel style={{ marginRight: 5 }}>Sort</ControlLabel>
                <FormControl componentClass="select">
                  <option value="NewestFirst">Newest First</option>
                  <option value="voteScore">Vote Score</option>
                </FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {
          this.props.posts &&

          this.props.posts.map(post => (
            // todo: hide posts marked as deleted.
            <PostPreview post={post} key={post.id} />
          ))
        }
      </Fragment>
    )
  }
}

export default PostList