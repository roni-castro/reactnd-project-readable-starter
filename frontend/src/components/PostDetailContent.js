import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, ButtonGroup, Container, Row, Col, Badge } from 'reactstrap';
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'
import { Icon } from 'react-icons-kit'
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
                            <caption>
                                <Badge color={post.voteScore >=0 ? "success" : "danger"}>{post.voteScore} points</Badge>
                            </caption>
                            <hr className="my-2" />
                            <p>
                                <small className="text-muted">{`Created by ${post.author} 
                                    on: ${moment(post.timestamp).format("LLL")}`}
                                </small>
                            </p>
                            <p className="lead">
                                <ButtonGroup>
                                    <Button color="primary">
                                        <Icon size={24} icon={ic_mode_edit} />
                                    </Button>
                                    <Button color="danger">
                                        <Icon size={24} icon={ic_delete} />
                                    </Button>
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