import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, Container, Row, Col } from 'reactstrap'
import * as moment from 'moment';
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
                        <Card body outline color="secondary">
                            <CardTitle>{post.title}</CardTitle>
                            <CardText>{post.body}</CardText>
                            <CardText>
                                <small className="text-muted">{`Created by ${post.author} 
                                    on: ${moment(post.timestamp).format("LLL")}`}
                                </small>
                            </CardText>
                        </Card>
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