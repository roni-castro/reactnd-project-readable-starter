import React from 'react';
import PropTypes from 'prop-types';
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { Badge } from 'reactstrap';

export const VoteUpAndDown = ({quantityOfVotes, onVoteUp, onVoteDown, postId}) => (
    <div>
        <MdThumbUp size={24} onClick={(value) => onVoteUp(postId)}/>
        <Badge color="secondary">{quantityOfVotes? quantityOfVotes: 0}</Badge>
        <MdThumbDown size={24} onClick={(value) => onVoteDown(postId)}/>
    </div>
)

VoteUpAndDown.propTypes = {
    quantityOfVotes: PropTypes.number.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired
}