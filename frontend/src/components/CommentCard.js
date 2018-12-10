import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { VoteUpAndDown } from './VoteUpAndDown';
import { Container } from 'reactstrap';

export const CommentCard = ({comment}, onVoteUp, onVoteDown) => (
    <div>
        <Container fluid>
            <small className="text"><strong>{comment.author}</strong></small>
            <br/>
            <small className="text-muted">{moment(comment.timestamp).startOf('day').fromNow()}</small>
            <p>{comment.body}</p>
            <VoteUpAndDown
                quantityOfVotes={comment.voteScore} 
                onVoteUp={onVoteUp} 
                onVoteDown={onVoteDown} 
                commentId={comment.id}
            />
        </Container>
    </div>
)

CommentCard.propType = {
    comment: PropTypes.object.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired
}