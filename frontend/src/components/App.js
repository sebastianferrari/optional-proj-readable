import React, { Component, Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import CategoriesSidebar from './CategoriesSidebar'
import { Row, Col } from 'react-bootstrap'
import PostList from './PostList'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CategoryPosts from './CategoryPosts'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'

const NavAndRoutes = () => (
  <Fragment>
    <Nav />
    <div>
      <Route path='/' exact component={Home} />
      <Route path='/category/:category' exact component={CategoryPosts} />
      <Route path='/post/add' exact component={NewPost} />
    </div>
  </Fragment>
)

class App extends Component {
  // state = {
  //   sortOrder: 'NewestFirst'
  // }

  componentDidMount() {
    this.props.getData()
  }

  render() {
    const { categories } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <NavAndRoutes />

            {/* <h1>Readable App</h1> */}

            {/* <Row>
              <Col md={2}>
                <CategoriesSidebar categories={categories} />
              </Col>
              <Col md={10}>
                <PostList />
              </Col>
            </Row> */}

            {/* <Row>
            <Col md={12}>
              <CategoryPosts category={'redux'} />
            </Col>
          </Row> */}
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(handleInitialData())
  }
}

function mapStateToProps({ posts, categories }) {
  // console.log({ posts })
  // console.log({ categories })

  return {
    posts,
    categories,
    loading: posts.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
