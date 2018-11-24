import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button } from 'reactstrap';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { getPostAPI } from '../actions/postActions';

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
                <Jumbotron>
                    <h1 className="display-3">{post.title}</h1>
                    {/* <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p> */}
                    <p className="lead">{post.body}</p>
                    <hr className="my-2" />
                    <p>
                        <small className="text-muted">{`Created by ${post.author} 
                            on: ${moment(post.timestamp).format("LLL")}`}
                        </small>
                    </p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>


                {/* <Card body outline color="secondary">
                    <CardTitle>{post.title}</CardTitle>
                    <CardText>{post.body}</CardText>
                    <CardText>
                        <small className="text-muted">{`Created by ${post.author} 
                            on: ${moment(post.timestamp).format("LLL")}`}
                        </small>
                    </CardText>
                </Card> */}
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
        getSinglePost: (postId) => dispatch(getPostAPI(postId)),
        // upVote: (postId) => dispatch(updateVoteAPI(postId, "upVote")),
        // downVote: (postId) => dispatch(updateVoteAPI(postId, "downVote"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContent)