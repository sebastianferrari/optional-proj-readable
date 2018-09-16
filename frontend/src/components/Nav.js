import React from 'react'
import { Navbar, Glyphicon } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Glyphicon glyph="book" /> Readable App
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Text>
          <NavLink to='/' exact activeClassName='active'>
            <Glyphicon glyph="home" /> Home
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink to='/post/add' exact activeClassName='active'>
            <Glyphicon glyph="plus" /> Add Post
          </NavLink>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}