import React from 'react'
import PostBody  from './PostBody';
import NavDropdownMenu from './NavDropdownMenu';

export default class Category extends React.Component {
    render() {
      const { match } = this.props
      const category = match.params.categoryId
  
      return (
        <div>
            <NavDropdownMenu />
            <PostBody title={category} category={category} />
        </div>
      )
    }
  }