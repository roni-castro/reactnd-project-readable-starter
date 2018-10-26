import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'reactstrap'

export const ListCard = ({posts}) => (
    <div>
        {posts.map((post) => (
            <Card key={post.id} body outline color="secondary">
                <CardTitle>{post.title}</CardTitle>
                <CardText>{post.body}</CardText>
                <CardText>
                    <small className="text-muted">{`Created by ${post.author} at: ${post.timestamp}`}</small>
                </CardText>
            </Card>
            )
        )}
    </div>
)

ListCard.propTypes = {
    posts: PropTypes.array.isRequired
}