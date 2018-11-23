import PostBody from './PostBody'
import React from 'react';
import NavDropdownMenu from './NavDropdownMenu';
import FloatingActionButtons from './FloatingActionButton'

export const Home = () => (
    <div>
        <NavDropdownMenu />
        <PostBody title="Home"/>
        <FloatingActionButtons />
    </div>
)