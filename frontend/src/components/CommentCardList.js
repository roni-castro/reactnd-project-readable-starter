import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CommentCard } from './CommentCard';
import { 
    fetchAllPostCommentsAPI,
    updateCommentVoteAPI 
} from '../actions/commentActions';
class CommentCardList extends React.Component {

    componentDidMount() {
        this.props.fetchAllPostComments(this.props.postId)
    } 

    render() {
        const { upVote, downVote, comments} = this.props
        let orderedComments = orderComments(comments)
        return (
            <div>
                {orderedComments.map((comment) => (
                    <div key={comment.id}>
                        <CommentCard 
                            comment={comment} 
                            onVoteUp={upVote}
                            onVoteDown={downVote}
                        />
                        <hr />
                    </div>
                ))}
            </div>
        )
    }
}

function orderComments(comments) {
    return comments.sort((a,b) => b.voteScore - a.voteScore) 
}

CommentCardList.propTypes = {
    postId: PropTypes.string,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired
}

function mapStateToProps({ commentsReducer }) {
    return {
        comments: commentsReducer.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllPostComments: (postId) => dispatch(fetchAllPostCommentsAPI(postId)),
        upVote: (commentId) => dispatch(updateCommentVoteAPI(commentId, "upVote")),
        downVote: (commentId) => dispatch(updateCommentVoteAPI(commentId, "downVote"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCardList)