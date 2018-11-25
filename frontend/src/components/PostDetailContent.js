import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, ButtonGroup, Container, Row, Col, Badge } from 'reactstrap';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { getPostByIdAPI } from '../actions/postActions';
import NavDropdownMenu from './NavDropdownMenu';

class PostDetailContent extends React.Component {
    
    componentDidMount() {
        const { match } = this.props
        const postId = match.params.postId
        this.props.fetchPostById(postId)
    } 

    render() {
        let { post } = this.props
        return (
            <div>
                <NavDropdownMenu/>
                <Container key={post.id}>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className="display-3">{post.title}</h1>
                            <caption><Badge color="secondary">{post.voteScore} votes</Badge></caption>
                            <hr className="my-2" />
                            <p>
                                <small className="text-muted">{`Created by ${post.author} 
                                    on: ${moment(post.timestamp).format("LLL")}`}
                                </small>
                            </p>
                            <p className="lead">
                                <ButtonGroup>
                                    <Button color="primary">Edit</Button>
                                    <Button color="primary">Remove</Button>
                                </ButtonGroup>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>


               
            </div>
        )
    }
}

PostDetailContent.propType = {
    post: PropTypes.object.isRequired
}

function mapStateToProps({ singlePostReducer, ownProps }) {
    return {
        post: singlePostReducer.post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: (postId) => dispatch(getPostByIdAPI(postId)),
        // upVote: (postId) => dispatch(updateVoteAPI(postId, "upVote")),
        // downVote: (postId) => dispatch(updateVoteAPI(postId, "downVote"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContent)