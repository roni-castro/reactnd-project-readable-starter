import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Col, Card, Button, Container } from 'reactstrap';
import { newPostAPI, editPostByIdAPI, getPostByIdAPI } from '../actions/postActions';
import NavDropdownMenu from './NavDropdownMenu';
class AddOrEditPost extends React.Component {
    state = {
        isEditing: false,
        isDisabledButton: false,
        post: {
            id: null,
            timestamp: null,
            title: "",
            body: "",
            author: "",
            category: null
        }
    }

    componentDidMount() {
        const { match } = this.props
        const postId = match.params.postId
        if(postId === undefined) {
           this.setState({
                isEditing: false
            })
        } else {
            this.setState({
                isEditing: true
            })
            this.props.fetchPostById(postId)
        }
    }
    
    componentWillReceiveProps(props) {
        const postToBeEdited = props.editingPost
        if (postToBeEdited) {
          this.setState({
              post: postToBeEdited
          })
        }
      }

	handleChange = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        if(this.state.isDisabledButton){
            return
        }

        if(this.state.isEditing) {
            this.props.editPost(this.state.post)
            this.props.history.goBack();
        } else {
            this.props.newPost(this.state.post)
            this.props.history.push('/');
        }
        this.setState({isDisabledButton: true});
    }

    render() {
        const {categories} = this.props
        const post = this.state.post
        return (
            <div>
                <NavDropdownMenu />
                <Container>
                    <h1 className="text-center my-4">{this.state.isEditing ? "Edit Post" : "Create new Post"}</h1>
                    <Card body>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label for="title" sm={2}>Title</Label>
                                <Col sm={10}>
                                    <Input required value={post.title} type="text" name="title" 
                                    onChange={this.handleChange} placeholder="Type the title" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="body" sm={2}>Body</Label>
                                <Col sm={10}>
                                    <Input required value={post.body} type="textarea" name="body" onChange={this.handleChange} placeholder="Type the content" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="author" sm={2}>Author</Label>
                                <Col sm={10}>
                                    <Input type="text" value={post.author} name="author" onChange={this.handleChange} placeholder="Type the author name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="category" sm={2}>Category</Label>
                                <Col sm={10}>
                                    <Input type="select" name="category" onChange={this.handleChange}>
                                        {categories.map((category) => (
                                            <option key={category.name} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <Button type="submit" disabled={this.state.isDisabledButton} color="secondary" size="lg">{this.state.isEditing ? "Save" : "Create"}</Button>
                        </Form> 
                    </Card>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({categoryReducer, singlePostReducer}) {
    return {
        categories: categoryReducer.categories || [],
        editingPost: singlePostReducer.post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newPost: (data) => dispatch(newPostAPI(data)),
        editPost: (postId) => dispatch(editPostByIdAPI(postId)),
        fetchPostById: (postId) => dispatch(getPostByIdAPI(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPost);

