import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, ButtonGroup, Container, Row, Col, Badge } from 'reactstrap';
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'
import { Icon } from 'react-icons-kit'
import * as moment from 'moment';
import { connect } from 'react-redux';
import { getPostByIdAPI, deletePostByIdAPI } from '../actions/postActions';
import NavDropdownMenu from './NavDropdownMenu';
import ModalConfirmation from './ModalConfirmation';
import CommentInput from './CommentInput';
import CommentCardList from './CommentCardList';

class PostDetailContent extends React.Component {

    state = {
        isModalDeleteOpen: false
    }
    
    componentDidMount() {
        const { match } = this.props
        const postId = match.params.postId
        this.props.fetchPostById(postId)
    } 

    onRemovePostButtonClicked = () => {
        this.toogle()
    }

    onEditPostButtonClicked = () => {
        this.props.history.push(`/category/${this.props.post.category}/post/${this.props.post.id}/edit`);
    }

    deletePost = (postId) => {
        this.props.deletePostById(postId)
        this.props.history.push('/')
    }


    toogle = () => {
        this.setState({
            isModalDeleteOpen: !this.state.isModalDeleteOpen
        });
    }

    render() {
        let { post } = this.props
        return (
            <div>
                <NavDropdownMenu/>
                <ModalConfirmation 
                    title="Remove Post"
                    message="Are you sure?"
                    toggleModal={this.toogle}
                    isModalOpen={this.state.isModalDeleteOpen}
                    handleSubmit={() => this.deletePost(post.id)}
                />
                <Container key={post.id}>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className="display-3">{post.title}</h1>
                            <p>
                                <Badge color={post.voteScore >=0 ? "success" : "danger"}>{post.voteScore} points</Badge>
                            </p>
                            <p className="lead">{post.body}</p>
                            <p>
                                <small className="text-muted">{`Created by ${post.author} 
                                    on: ${moment(post.timestamp).format("LLL")}`}
                                </small>
                            </p>
                            <hr className="my-3" />
                            <ButtonGroup color="red">
                                <Button onClick={() => this.onEditPostButtonClicked()} color="primary">
                                    <Icon size={24} icon={ic_mode_edit} />
                                </Button>
                                <Button onClick={() => this.onRemovePostButtonClicked()} color="danger">
                                    <Icon size={24} icon={ic_delete} />
                                </Button>
                            </ButtonGroup>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CommentInput postId={post.id}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CommentCardList postId={post.id} />
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

function mapStateToProps({ singlePostReducer }) {
    return {
        post: singlePostReducer.post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostById: (postId) => dispatch(getPostByIdAPI(postId)),
        deletePostById: (postId) => dispatch(deletePostByIdAPI(postId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContent)
