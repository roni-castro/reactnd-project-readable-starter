import React from 'react';
import { connect } from 'react-redux';
import { PostCardList } from './PostCardList';
import { FilterSelect } from './FilterSelect';
import * as ServerAPI from '../ServerAPI';
import { getPostsAPI, updateVoteAPI } from '../actions/post';
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
        this.props.getPosts()
    } 

    onFilterSelected = (event) => {
        let filterSelectedId = event.target.value
        this.setState({ filterSelectedId })
        this.props.getPosts()
    }

    render() {
        let {posts, upVote, downVote} = this.props
        let filteredPosts = orderPosts(this.state.filterSelectedId, posts)
        return (
            <div>
                <h1>Home</h1>
                <FilterSelect 
                    options={this.state.filterTypes}
                    optionSelectedId={this.state.filterSelectedId}
                    onFilterSelected={this.onFilterSelected} 
                />
                <PostCardList posts={filteredPosts} onVoteUp={upVote} onVoteDown={downVote}/>
            </div>
        )
    }
}

function orderPosts(filterSelectedId, posts) {
    if(filterSelectedId === TIMESTAMP_FILTER_TYPE) {
       return posts.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
    } else if(filterSelectedId === VOTE_FILTER_TYPE) {
       return posts.sort((a,b) => b.voteScore - a.voteScore) 
    } else {
        return posts
    }
}


function mapStateTopProps({postReducer}) {
    return {
        posts: postReducer.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (filterSelectedId) => dispatch(getPostsAPI(filterSelectedId)),
        upVote: (postId) => dispatch(updateVoteAPI(postId, "upVote")),
        downVote: (postId) => dispatch(updateVoteAPI(postId, "downVote"))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Home)