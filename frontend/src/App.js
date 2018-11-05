import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import NavDropdownMenu from './components/NavDropdownMenu';
import { Home } from './components/Home';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AddOrEditPost }  from './components/AddOrEditPost';
import { connect } from 'react-redux';
import { fetchCategoriesAPI } from './actions/category';

class App extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
        // <div>
          
        //     {/* {this.state.categories.map((category) => (
        //        <Route key={category.name} path={`${category.path}`} />
        //     ))} */}
        //   <Route exact path="/" component={Home}/>
        //   <Route exact path="/post" render={() => (
        //     <AddOrEditPost  
        //       // categories={this.state.categories}
        //       // onPostCreated={this.onPostCreated}
        //     />
        //   )}/>
        // </div>
      <div>
        <NavDropdownMenu />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={PostForm} /> */}
          <Route exact path="/category/:category" component={AddOrEditPost} />
          {/* <Route path="/category/:category/:postId" component={PostDetails} /> */}
          {/* <Route component={NotFound} /> */}
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
    getCategories: fetchCategoriesAPI,
    // getPosts: postsAPI
  })(App)
);