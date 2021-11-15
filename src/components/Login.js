import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Select,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { setAuthUser } from '../actions/authUser';

class Login extends Component {
 
  state = {
		value: 'users',
    toHome: false,
   // loading: false,
	};

 // handleLoading = () => {
  //  this.setState({ loading: true });
 // };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
	

	handleSubmit = (e) => {
    e.preventDefault()
    let id = '';
    const { value } = this.state;
    const { users } = this.props;
    const userIDs = Object.keys(users);
    userIDs.forEach(userID => {
      if (users[userID].name === value) {
        id = userID;
      }
    });
   const from =
   this.props.location.state || { from: { pathname: '/home'}}

    this.props.dispatch(setAuthUser(id));
    this.props.history.push(`${from}`);

   
	};
  render() {
    const { users } = this.props;
    const names = Object.keys(users);
    return (
      <Fragment>
      <Container>
      <Box>
    <Heading>Welcome to the Would You Rather App!</Heading>
    <Text>Please sign in to continue</Text>
    <form onSubmit={this.handleSubmit }>
    <FormControl >
  <Select 
  onChange={this.onChange} 
  value={this.state.value}>
  <option>{this.state.value}</option>
  {names.map(name => (
    <option key={users[name].id} name={users[name].id} value={users[name].name}>
      {users[name].name}
    </option>
  ))}
  </Select>
</FormControl>
<input
            className=""
            type="submit"
            value="Log In"
            disabled={this.state.value === 'users'}
          />
</form>
  </Box>
 
      </Container>
        
      </Fragment>
    );
  }
}
 
    function mapStateToProps({ users }) {
      return {
        users,
      };
    }
    
    export default withRouter(connect(mapStateToProps)(Login));
    