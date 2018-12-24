import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Home } from './Home';
import AddOrEditPost  from './AddOrEditPost';
import Category  from './Category';
import PostDetailContent from './PostDetailContent';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategoriesAPI } from '../actions/categoryActions';

class App extends Component {

  componentDidMount() {
    this.props.fetchCategoriesAPI();
  }

  render() {
    return (
      <div>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post" component={AddOrEditPost} />
          <Route exact path="/category/:categoryId" component={ Category } />
          <Route exact path="/category/:categoryId/post/:postId" component={ PostDetailContent } />
          <Route exact path="/category/:categoryId/post/:postId/edit" component={ AddOrEditPost } />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func,
  getPosts: PropTypes.func
};

export default withRouter(
  connect(null, {
    fetchCategoriesAPI: fetchCategoriesAPI
  })(App)
);