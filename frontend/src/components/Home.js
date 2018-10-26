import React from 'react';
import { ListCard } from './ListCard';
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
                <ListCard posts={this.state.posts}/>
            </div>
        )
    }
    
}