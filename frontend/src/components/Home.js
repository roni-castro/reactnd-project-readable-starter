import React from 'react';
import { PostCardList } from './PostCardList';
import * as ServerAPI from '../ServerAPI'

export class Home extends React.Component {
    state = {
        posts: []
    }
    
    componentDidMount() {
        this.getAllPosts()
    } 

    getAllPosts() {
        ServerAPI.getAllPosts().then((posts) => {
            console.log(posts)
            this.setState({
                posts
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <PostCardList posts={this.state.posts}/>
            </div>
        )
    }
    
}