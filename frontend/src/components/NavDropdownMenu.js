import React from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';


class NavDropdownMenu extends React.Component {
 constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

componentDidMount() {
  console.log(this.props)
}

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    render() {
      console.log(this.props)
      const { categories } = this.props;
      return (
        <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Read</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              {categories.map((category) => (
                <NavItem key={category.name} >
                  <NavLink href={`/${category.name}`}>{category.name}</NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories || []
  });
  
  export default connect(mapStateToProps)(NavDropdownMenu);
  