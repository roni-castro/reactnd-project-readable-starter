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

    onVoteUp = (postId) => {
        ServerAPI.updateVote(postId, "upVote").then((post) => {
            this.getAllPosts()
        })
    }

    onVoteDown = (postId) => {
        ServerAPI.updateVote(postId, "downVote").then((post) => {
            this.getAllPosts()
        })
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
                <PostCardList posts={this.state.posts} onVoteUp={this.onVoteUp} onVoteDown={this.onVoteDown}/>
            </div>
        )
    }
    
}