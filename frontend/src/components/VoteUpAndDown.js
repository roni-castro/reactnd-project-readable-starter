import React from 'react';
import PropTypes from 'prop-types';
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { Badge } from 'reactstrap';

export const VoteUpAndDown = ({quantityOfVotes}) => (
    <div>
        <MdThumbUp size={24}/>
        <Badge color="secondary">{quantityOfVotes? quantityOfVotes: 0}</Badge>
        <MdThumbDown size={24}/>
    </div>
)

VoteUpAndDown.propTypes = {
    quantityOfVotes: PropTypes.number.isRequired
}