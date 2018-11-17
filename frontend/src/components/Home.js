import React from 'react';
import { connect } from 'react-redux';
import { PostCardList } from './PostCardList';
import { FilterSelect } from './FilterSelect';
import * as ServerAPI from '../ServerAPI';
import { getPostsAPI } from '../actions/post';
import 
{ 
    VOTE_FILTER_TYPE, 
    TIMESTAMP_FILTER_TYPE
} from '../utils/Constants'

class Home extends React.Component {
    state = {
        filterTypes:  [
            {id: VOTE_FILTER_TYPE, value: VOTE_FILTER_TYPE.toUpperCase()},
            {id: TIMESTAMP_FILTER_TYPE, value: TIMESTAMP_FILTER_TYPE.toUpperCase()}
        ],
        filterSelectedId: VOTE_FILTER_TYPE,
    }
    
    componentDidMount() {
        this.props.getPosts(this.state.filterSelectedId)
    } 

    onVoteUp = (postId) => {
        ServerAPI.updateVote(postId, "upVote").then((post) => {
            this.props.getPosts(this.state.filterSelectedId)
        })
    }

    onVoteDown = (postId) => {
        ServerAPI.updateVote(postId, "downVote").then((post) => {
            this.props.getPosts(this.state.filterSelectedId)
        })
    }

    onFilterSelected = (event) => {
        let filterSelectedId = event.target.value
        this.setState({ filterSelectedId })
        this.props.getPosts(filterSelectedId)
    }

    // getAllPosts() {
    //     ServerAPI.getAllPosts().then((posts) => {
    //         posts = this.orderPosts(this.state.filterSelectedId, posts)
    //         this.setState({
    //             posts
    //         })
    //     })
    // }

    // orderPosts(filterSelectedId, posts) {
    //     if(filterSelectedId === TIMESTAMP_FILTER_TYPE) {
    //        return posts.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
    //     } else if(filterSelectedId === VOTE_FILTER_TYPE) {
    //        return posts.sort((a,b) => b.voteScore - a.voteScore) 
    //     } else {
    //         return posts
    //     }
    // }

    render() {
        let {posts} = this.props
        console.log(posts)
        return (
            <div>
                <h1>Home</h1>
                <FilterSelect 
                    options={this.state.filterTypes}
                    optionSelectedId={this.state.filterSelectedId}
                    onFilterSelected={this.onFilterSelected} 
                />
                <PostCardList posts={posts} onVoteUp={this.onVoteUp} onVoteDown={this.onVoteDown}/>
            </div>
        )
    }
}

function mapStateTopProps({postReducer}) {
    return {
        posts: postReducer.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (filterSelectedId) => dispatch(getPostsAPI(filterSelectedId))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Home)