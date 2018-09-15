import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './CategoriesSidebar.css'

export default function CategoriesSidebar(props) {
  return (
    <Row>
      <Col xs={12}>
        <h3>Categories</h3>
        {props.categories && props.categories.map(cat => (
          <div className='categories-sidebar-item' key={cat.name}>{cat.path}</div>
        ))}
      </Col>
    </Row>
  )
}