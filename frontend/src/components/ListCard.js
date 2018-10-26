import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, Container, Row, Col, Badge } from 'reactstrap'
import * as moment from 'moment';
import { MdThumbDown, MdThumbUp } from "react-icons/md";

export const ListCard = ({posts}) => (
    <div>
        {posts.map((post) => (
            <Container key={post.id}>
                <Row>
                    <Col xs="auto">
                        <MdThumbUp size={24}/>
                        <Badge color="secondary">1</Badge>
                        <MdThumbDown size={24}/>
                        <Badge color="secondary">4</Badge>
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