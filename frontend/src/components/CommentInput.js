
import React from 'react';
import { connect } from 'react-redux';
import { Form, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { 
    fetchCommentByIdAPI, 
    editCommentAPI,
    createCommentAPI
} from '../actions/commentActions';
import PropTypes from 'prop-types';

const initialState = {
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
};

class CommentInput extends React.Component {
    state = initialState


    componentDidMount() {
        const {commentId, postId} = this.props
        if(commentId === undefined) {
           this.setState({
                ...this.state,
                isEditing: false,
                comment: {
                    ...this.state.comment,
                    parentId: postId
                }
            })
        } else {
            this.setState({
                isEditing: true,
            })
            this.props.fetchCommentById(commentId)
        }
    }

    componentWillReceiveProps(props) {
        if(this.state.isEditing) {
            const commentToBeEdited = props.commentToBeEdited
            if (commentToBeEdited) {
                this.setState({
                    comment: commentToBeEdited
                })
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            comment: {
                ...this.state.comment,
                [event.target.name]: event.target.value,
            }
        })
    }

    
    areAllFieldValid = () => {
        const { comment }= this.state
        return comment.author !== "" && comment.body !== ""
    }

    onSubmit = (event) => {
        event.preventDefault()
        
        if(this.state.isEditing) {
            this.props.editComment(this.state.comment)
            this.props.onUpdateButtonClicked()
        } else {
            this.props.createComment(this.state.comment)
        }
       this.reset()
    }

    reset() {
        this.setState(initialState);
    }

    render() {
        const { onCancelButtonClicked } = this.props
        const comment = this.state.comment
        const isDisabledButton = !this.areAllFieldValid()
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    {!this.state.isEditing && 
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <Input required value={comment.author} type="text" onChange={this.handleChange} name="author" placeholder="Author name" />
                        </InputGroupAddon>
                        <Input required value={comment.body} type="text" name="body" onChange={this.handleChange} placeholder="Add a comment..." />
                        <InputGroupAddon addonType="append">
                        <Button disabled={isDisabledButton} type="submit" color="success">Send</Button>
                        </InputGroupAddon>
                    </InputGroup>}
                    {this.state.isEditing && 
                    <InputGroup>
                        <Input required value={comment.body} type="text" name="body" onChange={this.handleChange} placeholder="Edit a comment..." />
                        <InputGroupAddon addonType="append">
                            <Button disabled={isDisabledButton} type="submit" color="success">Update</Button>
                            <Button onClick={() => onCancelButtonClicked()} name="cancel" type="button" color="secondary">Cancel</Button>
                        </InputGroupAddon>
                    </InputGroup>}
                </Form>
            </div>
        )
    }
}

CommentInput.propType = {
    commentToBeEdited: PropTypes.object.isRequired,
    commentId: PropTypes.string,
    postId: PropTypes.string,
    fetchCommentById: PropTypes.func.isRequired,
    onCancelButtonClicked: PropTypes.func,
    onUpdateButtonClicked: PropTypes.func
}

function mapStateToProps({singleCommentReducer}, ownProps) {
    return {
        commentToBeEdited: singleCommentReducer.comment,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCommentById: (commentId) => dispatch(fetchCommentByIdAPI(commentId)),
        createComment: (comment) => dispatch(createCommentAPI(comment)),
        editComment: (comment) => dispatch(editCommentAPI(comment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);