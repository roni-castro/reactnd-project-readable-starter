import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'reactstrap';
import * as moment from 'moment';
import { Link } from 'react-router-dom'

export const PostCard = ({post}) => (
    <div>
         <Card body outline color="secondary">
            <CardTitle>
                <Link to={`/category/${post.category}/post/${post.id}`}>{post.title}</Link>
            </CardTitle>
            <CardText>{post.body}</CardText>
            <CardText>
                <small className="text-muted">{`Created by ${post.author} 
                    on: ${moment(post.timestamp).format("LLL")}`}
                </small>
            </CardText>
        </Card>
    </div>
)

PostCard.propType = {
    post: PropTypes.object.isRequired,
}