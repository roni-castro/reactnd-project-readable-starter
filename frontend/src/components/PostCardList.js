import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap'
import { PostCard } from './PostCard'
import { VoteUpAndDown } from './VoteUpAndDown'

export const PostCardList = ({posts, onVoteUp, onVoteDown}) => (
    <div>
        {posts.map((post) => (
            <Container key={post.id} className="my-4">
                <Row>
                    <Col xs="4" md="2">
                        <div className="flex-center">
                            <VoteUpAndDown quantityOfVotes={post.voteScore} onVoteUp={onVoteUp} onVoteDown={onVoteDown} postId={post.id}/>
                       </div>
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

PostCardList.propTypes = {
    posts: PropTypes.array.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired
}