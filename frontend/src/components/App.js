import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import NavDropdownMenu from './NavDropdownMenu';
import Home from './Home';
import { Route, Switch, withRouter } from 'react-router-dom';
import AddOrEditPost  from './AddOrEditPost';
import { connect } from 'react-redux';
import { fetchCategoriesAPI } from '../actions/categoryActions';

class App extends Component {

  componentDidMount() {
    this.props.fetchCategoriesAPI();
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
          <Route exact path="/post" component={AddOrEditPost} />
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
    fetchCategoriesAPI: fetchCategoriesAPI
  })(App)
);