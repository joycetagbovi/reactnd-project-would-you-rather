import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Heading, Button, Text} from '@chakra-ui/react';



export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired
  };
  state = {
    viewPoll: false
  };
  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }));
  };
  render() {
    const { question } = this.props;
   
    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Heading  size="sm">
          Would you rather
        </Heading>
        <Text fontSize="sm">
          {question.optionOne.text}
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

export default PollTeaser;
