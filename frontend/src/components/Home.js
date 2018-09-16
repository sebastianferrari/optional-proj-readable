import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import CategoriesSidebar from './CategoriesSidebar'
import PostList from './PostList'

class Home extends Component {
  render() {
    return (
      <Row>
        <Col md={2}>
          <CategoriesSidebar />
        </Col>
        <Col md={10}>
          <PostList />
        </Col>
      </Row>
    )
  }
}

export default Home