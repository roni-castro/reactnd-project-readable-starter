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
import { State404 } from './State404';

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
          <Route exact path="/:categoryId" component={ Category } />
          <Route exact path="/:categoryId/:postId" component={ PostDetailContent } />
          <Route exact path="/:categoryId/:postId/edit" component={ AddOrEditPost } />
          <Route component={ State404 } />
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