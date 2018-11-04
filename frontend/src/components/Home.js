import React from 'react';
import { PostCardList } from './PostCardList';
import { FilterSelect } from './FilterSelect';
import * as ServerAPI from '../ServerAPI';
import 
{ 
    VOTE_FILTER_TYPE, 
    TIMESTAMP_FILTER_TYPE
} from '../utils/Constants'

export class Home extends React.Component {
    state = {
        filterTypes:  [
            {id: VOTE_FILTER_TYPE, value: VOTE_FILTER_TYPE.toUpperCase()},
            {id: TIMESTAMP_FILTER_TYPE, value: TIMESTAMP_FILTER_TYPE.toUpperCase()}
        ],
        filterSelectedId: VOTE_FILTER_TYPE,
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

    onFilterSelected = (event) => {
        this.setState({
            filterSelectedId: event.target.value
        }, this.getAllPosts())

    }

    getAllPosts() {
        ServerAPI.getAllPosts().then((posts) => {
            posts = this.orderPosts(this.state.filterSelectedId, posts)
            this.setState({
                posts
            })
        })
    }

    orderPosts(filterSelectedId, posts) {
        if(filterSelectedId === TIMESTAMP_FILTER_TYPE) {
           return posts.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
        } else if(filterSelectedId === VOTE_FILTER_TYPE) {
           return posts.sort((a,b) => b.voteScore - a.voteScore) 
        } else {
            return posts
        }
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                
                <FilterSelect 
                    options={this.state.filterTypes}
                    optionSelectedId={this.state.filterSelectedId}
                    onFilterSelected={this.onFilterSelected} 
                />
                <PostCardList posts={this.state.posts} onVoteUp={this.onVoteUp} onVoteDown={this.onVoteDown}/>
            </div>
        )
    }
    
}