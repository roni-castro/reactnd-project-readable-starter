import React from 'react';
import { Form, FormGroup, Label, Input, Col, Card, Button } from 'reactstrap';
import * as ServerAPI from '../ServerAPI';
import * as uuidv4 from 'uuid';

export class AddOrEditPost extends React.Component {
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

    componentDidMount() {
        console.log(this.props)
    }

    handleChange = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        })
    }

    onSubmit = () => {
        ServerAPI.createPost({
            ...this.state.post,
            id: uuidv4(),
            timestamp: Date.now()
        }).then((post) => {
            console.log("Criado" + post)
            this.props.onPostCreated(post)
        })
    }

    render() {
        const {categories} = this.props || {}
        return (
            <div>
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