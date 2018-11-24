import React from 'react';
import PropTypes from 'prop-types';
import NavDropdownMenu from './NavDropdownMenu';
import PostCard from './PostCard';

class PostDetail extends React.Component {
    render() {
        const { post } = this.props
        return (
            <div>
                <NavDropdownMenu/>
                <PostCard post={post}/>
            </div>
        )
    }
}

PostDetail.propTypes = {
    post: PropTypes.array.isRequired
}