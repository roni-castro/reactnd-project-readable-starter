import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { VoteUpAndDown } from './VoteUpAndDown';
import CommentInput from './CommentInput';
import { Icon } from 'react-icons-kit'
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'
import { Container, ButtonGroup, Button, Row, Col  } from 'reactstrap';

export class CommentCard extends React.Component {

    state = {
        isEditing: false
    }

    onEditCommentButtonClicked = () => {
        this.setState({
            isEditing: true
        })
    }

    onCancelButtonClicked = () => {
        this.setState({
            isEditing: false
        })
    }

    onUpdateButtonClicked = () => {
        this.setState({
            isEditing: false
        })
    }

    render() {
        let { comment, onVoteUp, onVoteDown, onDeleteCommentButtonClicked } = this.props;
        return (
            <div>
                <Container fluid>
                    <small className="text"><strong>{comment.author}</strong></small>
                    <br/>
                    <small className="text-muted">{moment(comment.timestamp).startOf('day').fromNow()}</small>
                    {!this.state.isEditing && 
                    <div>
                        <p>{comment.body}</p>
                        <Row>
                            <Col xs="6">
                                <VoteUpAndDown
                                    quantityOfVotes={comment.voteScore} 
                                    onVoteUp={onVoteUp} 
                                    onVoteDown={onVoteDown} 
                                    commentId={comment.id}
                                />
                            </Col>
                            <Col xs="6" >
                                <div className="text-right">
                                    <ButtonGroup size="sm" className="my-2">
                                        <Button float-right onClick={() => this.onEditCommentButtonClicked()} color="primary">
                                            <Icon size={16} icon={ic_mode_edit} />
                                        </Button>
                                        <Button onClick={() => onDeleteCommentButtonClicked(comment)} color="danger">
                                            <Icon size={16} icon={ic_delete} />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </Row>
                    </div>}
                    {this.state.isEditing && <div>
                        <CommentInput 
                            onUpdateButtonClicked={this.onUpdateButtonClicked}
                            onCancelButtonClicked={this.onCancelButtonClicked} 
                            commentId={comment.id } />
                    </div>}
                </Container>
            </div>
        )
    }
}

CommentCard.propType = {
    comment: PropTypes.object.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    onDeleteCommentButtonClicked: PropTypes.func.isRequired
}