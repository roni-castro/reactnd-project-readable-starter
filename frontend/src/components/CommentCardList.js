import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CommentCard } from './CommentCard';
import ModalConfirmation from './ModalConfirmation';
import { 
    fetchAllPostCommentsAPI,
    updateCommentVoteAPI,
    deleteCommentAPI,
} from '../actions/commentActions';
class CommentCardList extends React.Component {

    state = {
        isModalDeleteOpen: false,
        commentIdToBeRemoved: null,
    }

    componentDidMount() {
        this.props.fetchAllPostComments(this.props.postId)
    } 

    onRemoveCommentButtonClicked = (comment) => {
        this.setState({
            commentIdToBeRemoved: comment.id,
        })
        this.toogle()
    }

    deleteCommentConfirmed = () => {
        this.setState({
            commentIdToBeRemoved: null,
        }, this.props.deleteComment(this.state.commentIdToBeRemoved))
        this.toogle()
    }

    toogle = () => {
        this.setState({
            isModalDeleteOpen: !this.state.isModalDeleteOpen
        });
    }

    render() {
        const { upVote, downVote, comments} = this.props
        let orderedComments = orderComments(comments)
        return (
            <div>
                <ModalConfirmation 
                    title="Remove Comment"
                    message="Are you sure?"
                    toggleModal={this.toogle}
                    isModalOpen={this.state.isModalDeleteOpen}
                    handleSubmit={() => this.deleteCommentConfirmed()}
                />
                {orderedComments.map((comment) => (
                    <div key={comment.id}>
                        <CommentCard 
                            comment={comment} 
                            onVoteUp={upVote}
                            onVoteDown={downVote}
                            onDeleteCommentButtonClicked={this.onRemoveCommentButtonClicked}
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
        deleteComment: (commendId) => dispatch(deleteCommentAPI(commendId)),
        upVote: (commentId) => dispatch(updateCommentVoteAPI(commentId, "upVote")),
        downVote: (commentId) => dispatch(updateCommentVoteAPI(commentId, "downVote"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCardList)