import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Heading, Button,  Radio, Stack } from '@chakra-ui/react';
import { handleSaveQuestionAnswer } from '../actions/users';

export class PollQuestion extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  };
  state = {
    value: ''
  };

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false;

    return (
      <Fragment>
        <Heading as="h4" size="md">Would you rather</Heading>
        <form onSubmit={this.handleSubmit}>
          <Stack>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === 'optionOne'}
              onChange={this.handleChange}
            />
            <br />
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === 'optionTwo'}
              onChange={this.handleChange}
            />
          </Stack>
          <Stack>
            <Button
              colorScheme="green"
              size="lg"
              fluid
              positive
              disabled={disabled}
              >
                Submit</Button>
          </Stack>
        </form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(PollQuestion);

