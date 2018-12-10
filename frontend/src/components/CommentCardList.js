import React from 'react';
import PropTypes from 'prop-types';
import { CommentCard } from './CommentCard'

export const CommentCardList = ({comments = []}) => (
    <div>
        {comments.map((comment) => (
            <div key={comment.id}>
                <CommentCard comment={comment}/>
                <hr />
            </div>
        ))}
    </div>
)

CommentCardList.propTypes = {
    comments: PropTypes.array.isRequired,
}