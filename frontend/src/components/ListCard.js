import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap'
import { PostCard } from './PostCard'
import { VoteUpAndDown } from './VoteUpAndDown'

export const ListCard = ({posts}) => (
    <div>
        {posts.map((post) => (
            <Container key={post.id}>
                <Row>
                    <Col xs="auto">
                       <VoteUpAndDown quantityOfVotes={post.voteScore}/>
                    </Col>
                    <Col>
                       <PostCard post={post}/>
                    </Col>
                </Row>
            </Container>
            )
        )}
    </div>
)

ListCard.propTypes = {
    posts: PropTypes.array.isRequired
}