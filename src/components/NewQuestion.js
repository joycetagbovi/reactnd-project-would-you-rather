import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {  handleSaveQuestion } from '../actions/questions';
import { Container, Box, Button, Input, FormControl } from '@chakra-ui/react';


class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    backHome: false,
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

 
  handleSubmit = e => {
    e.preventDefault();
	  const { authUser, handleSaveQuestion } = this.props;
		const { optionOne, optionTwo } = this.state;

  const  myPromise = new Promise((response, reject) => {
      handleSaveQuestion(optionOne, optionTwo, authUser);
      setTimeout(() => response('success'), 1000);
    })
    myPromise.then(() => {
      this.setState({
       optionOne: '',
       optionTwo: '',
      })
      this.setState({ backHome: true });
    });

    }


  render() {
  
    if (this.state.backHome === true) {
      return <Redirect to="/" />;
    }
  const { optionOne , optionTwo } = this.state
    return (
      <Container>
      <Box>
        <p>To create a new question enter two answer options in the text felids below</p>
        <h2 >Would you rather...</h2>
        <form onSubmit={this.handleSubmit}>
          <FormControl >
            <Input
              type="text-area"
              name="optionOne"
              placeholder="Enter option One"
              value={optionOne}
              onChange={this.handleInputChange}
          
            />
        
          </FormControl>
          <span>or..</span>
          <FormControl >
            <Input 
              type="text-area"
              name="optionTwo"
              placeholder="Enter option Two"
              value={optionTwo}
              onChange={this.handleInputChange}
            
            />
           
          </FormControl>
          <Button type="submit" colorScheme="green">
            Submit
          </Button>
        </form>
      </Box>
      </Container>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
   authUser
  };
}

export default connect(mapStateToProps,{ handleSaveQuestion })(NewQuestion);




 

