import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Col, Card, Button } from 'reactstrap';
import * as uuidv4 from 'uuid';
import { newPostAPI } from '../actions/postActions';
import NavDropdownMenu from './NavDropdownMenu';
class AddOrEditPost extends React.Component {
    state = {
        post: {
            id: null,
            timestamp: null,
            title: "",
            body: "",
            author: "",
            category: null
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

    // onPostSuccess = (response) => {
    //     this.props.history.push(`/post/${response.id}`);
    // }

    onSubmit = (event) => {
        event.preventDefault()

        const body = {
            ...this.state.post,
            id: uuidv4(),
            timestamp: Date.now()
        }

        this.props.newPost(body)
        this.props.history.push('/');
    }

    render() {
        const {categories} = this.props
        return (
            <div>
                <NavDropdownMenu />
                <h1>Create new Post</h1>
                <Card body>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="title" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input required type="text" name="title" onChange={this.handleChange} placeholder="Type the title" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="body" sm={2}>Body</Label>
                            <Col sm={10}>
                                <Input required type="textarea" name="body" onChange={this.handleChange} placeholder="Type the content" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="author" sm={2}>Author</Label>
                            <Col sm={10}>
                                <Input type="text" name="author" onChange={this.handleChange} placeholder="Type the author name" />
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
                        <Button type="submit" color="secondary" size="lg">Create</Button>
                    </Form> 
                </Card>
            </div>
        )
    }
}

function mapStateToProps({categoryReducer}) {
    return {
        categories: categoryReducer.categories || []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newPost: (data) => dispatch(newPostAPI(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPost);