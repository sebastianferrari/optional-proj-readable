import React, { Component, Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import CategoriesSidebar from './CategoriesSidebar'
import { Row, Col } from 'react-bootstrap'
import PostList from './PostList'

class App extends Component {
  state = {
    sortOrder: 'NewestFirst'
  }

  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className='container'>
          <h1>Readable App</h1>
          <Row>
            <Col md={2}>
              <CategoriesSidebar categories={this.props.categories} />
            </Col>
            <Col md={10}>
              <PostList posts={this.props.posts} />
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(handleInitialData())
  }
}

function mapStateToProps({ posts, categories }) {
  console.log({ posts })
  console.log({ categories })

  return {
    posts,
    categories,
    loading: posts.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
