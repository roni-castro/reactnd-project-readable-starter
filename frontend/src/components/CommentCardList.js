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

    onEditCommentButtonClicked = (comment) => {
        console.log(comment);
    }

    onRemoveCommentButtonClicked = (comment) => {

        this.setState({
            isModalDeleteOpen: true,
            commentIdToBeRemoved: comment.id,
        })
    }

    deleteCommentConfirmed = () => {
        this.props.deleteComment(this.state.commentIdToBeRemoved)
        this.setState({
            isModalDeleteOpen: false,
            commentIdToBeRemoved: null,
        })
    }

    render() {
        const { upVote, downVote, comments} = this.props
        let orderedComments = orderComments(comments)
        return (
            <div>
                <ModalConfirmation 
                    title="Deletar Comentário"
                    message="Tem certeza que deseja remover este comentário?"
                    show={this.state.isModalDeleteOpen}
                    onConfirm={() => this.deleteCommentConfirmed()}
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