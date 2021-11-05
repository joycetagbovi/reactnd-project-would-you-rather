import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  handleSaveQuestion } from '../actions/questions';
import { Container, Box, Button, Input, FormControl } from '@chakra-ui/react';


class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  };

  handleChange = e => {
    this.setState({
     [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    // Create question info needed for dispatch
    const question = {
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
      author: this.props.authedUser,
    };
    // Check against empty questions, alert and only dispatch if inputs are not empty
    if (this.state.optionOne.length === 0 || this.state.optionTwo.length === 0) {
      alert('Please fill in the questions!');
    } else {
      dispatch( handleSaveQuestion(question)).then(() => this.props.history.push('/home'));
    }
  };

  render() {
    return (
      <Container>
      <Box>
        <p>To create a new question enter two answer options in the text fileds below</p>
        <h2 >Would you rather...</h2>
        <form onSubmit={this.handleSubmit}>
          <FormControl >
            <Input
              type="text-area"
              name="optionOne"
              placeholder="Enter option One"
              value={this.state.optionOne}
              onChange={this.handleChange}
              maxLength="50"
            />
            {/* input lenght is limited to 50 characters dispaly remaining characters count if remeinin is less than 15 */
            this.state.optionOne.length > 35 && (
              <p >{50 - this.state.optionOne.length}</p>
            )}
          </FormControl>
          <span>or..</span>
          <FormControl >
            <Input 
              type="text-area"
              name="optionTwo"
              placeholder="Enter option Two"
              value={this.state.optionTwo}
              onChange={this.handleChange}
              maxLength="50"
            />
            {
            this.state.optionTwo.length > 35 && (
              <p >{50 - this.state.optionTwo.length}</p>
            )}
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

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default withRouter(connect(mapStateToProps)(NewQuestion));

