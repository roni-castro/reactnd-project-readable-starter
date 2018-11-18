import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostCardList } from './PostCardList';
import { FilterSelect } from './FilterSelect';
import { getPostsAPI, updateVoteAPI } from '../actions/postActions';
import 
{ 
    VOTE_FILTER_TYPE, 
    TIMESTAMP_FILTER_TYPE
} from '../utils/Constants'

class PostBody extends React.Component {
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
        let {posts, upVote, downVote, title, category} = this.props
        let filteredPosts = posts
        console.log(category)
        if(category != null) {
            filteredPosts = posts.filter((post) => post.category === category)
        } 
        let orderedPosts = orderPosts(this.state.filterSelectedId, filteredPosts)
        return (
            <div>
                <h1>{title? title.toUpperCase(): ''}</h1>
                {orderedPosts.length > 0 &&
                    <div>
                        <FilterSelect 
                            options={this.state.filterTypes}
                            optionSelectedId={this.state.filterSelectedId}
                            onFilterSelected={this.onFilterSelected} 
                        />
                        <PostCardList posts={orderedPosts} onVoteUp={upVote} onVoteDown={downVote}/>
                    </div>
                }
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


function mapStateToProps({ postReducer, ownProps }) {
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

PostBody.propTypes = {
    posts: PropTypes.array,
    getPosts: PropTypes.func.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired
  };

export default connect(mapStateToProps, mapDispatchToProps)(PostBody)