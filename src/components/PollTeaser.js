import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Heading, Button, Text} from '@chakra-ui/react';
import { connect } from 'react-redux';

export class PollTeaser extends Component {
  
 state = {
   questionPoll: false
  };

 handleClick = e => {
  e.preventDefault();
  this.setState(({questionPoll: !this.state.questionPoll }));

 };


  render() {
    const { question } = this.props;
    if (this.state.questionPoll === true) {
      return <Redirect path to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Heading size="sm">
          Would you rather
        </Heading>
        <Text fontSize="sm">
          {this.props.question.optionOne.text}
          <br />
          or...
        </Text>
        <Button
          colorScheme="green"
          size="lg"
          fluid
          onClick={this.handleClick}  >
            View Question
            </Button>
      </Fragment>
    );
  }
}

function mapStateToProps({  authUser }) {
  return {
    authUser
  };
}

export default (connect(mapStateToProps)(PollTeaser));
