import React from 'react';
import PropTypes from 'prop-types';
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { Badge } from 'reactstrap';

export const VoteUpAndDown = ({quantityOfVotes, onVoteUp, onVoteDown, postId, commentId}) => (
    <div>
        {(commentId !== undefined || postId !== undefined) &&
            <div>
                <MdThumbUp size={24} onClick={(value) => onVoteUp(postId || commentId)}/>
                <Badge color={quantityOfVotes >=0 ? "success" : "danger"}>{quantityOfVotes || 0}</Badge>
                <MdThumbDown size={24} onClick={(value) => onVoteDown(postId || commentId)}/>
            </div>
        }
    </div>
)

VoteUpAndDown.propTypes = {
    quantityOfVotes: PropTypes.number.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    postId: PropTypes.string,
    commentId: PropTypes.string,
}