
import React from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { fetchCommentByIdAPI } from '../actions/commentActions';
import PropTypes from 'prop-types';

class CommentInput extends React.Component {
    state = {
        isEditing: false,
        comment: {
            id: null,
            parentId: null,
            timestamp: null,
            body: "",
            author: "",
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        }
    }

    componentDidMount() {
        const {commentId} = this.props
        if(commentId === undefined) {
           this.setState({
                isEditing: false
            })
        } else {
            this.setState({
                isEditing: true
            })
            this.props.fetchCommentById(commentId)
        }
    }

    componentWillReceiveProps(props) {
        const commentToBeEdited = props.commentToBeEdited
        if (commentToBeEdited) {
            this.setState({
                comment: commentToBeEdited
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            comment: {
                ...this.state.comment,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        const comment = this.state.comment
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <Input required value={comment.author} type="text" onChange={this.handleChange} name="author" placeholder="Author name" />
                    </InputGroupAddon>
                    <Input required value={comment.body} type="text" name="body" onChange={this.handleChange} placeholder="Add a comment..." />
                    <InputGroupAddon addonType="append">
                    <Button color="success">Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}

CommentInput.propType = {
    commentToBeEdited: PropTypes.object.isRequired,
    commentId: PropTypes.string,
    fetchCommentById: PropTypes.func.isRequired
}

function mapStateToProps({singleCommentReducer}) {
    return {
        commentToBeEdited: singleCommentReducer.comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCommentById: (commentId) => dispatch(fetchCommentByIdAPI(commentId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);