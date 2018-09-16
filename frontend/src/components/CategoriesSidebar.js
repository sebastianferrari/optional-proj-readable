import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './CategoriesSidebar.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class CategoriesSidebar extends Component {
  render() {
    const { categories } = this.props

    return (
      <Row>
        <Col xs={12}>
          <h3>Categories</h3>
          {categories && categories.map(cat => (
            <div className='categories-sidebar-item' key={cat.name}>
              <NavLink to={`/category/${cat.path}`} exact>
                {cat.name}
              </NavLink>
            </div>
          ))}
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(CategoriesSidebar)