import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Heading, Button,  Radio, Stack , Container} from '@chakra-ui/react';
import { handleSaveQuestionAnswer } from '../actions/users';

export class PollQuestion extends Component {
  state = {
    value: null,
  };

  onhandleChange = (e) => {
    this.setState({value: e.target.value})
  }

  onhandleSubmit = e => {
    e.preventDefault();
   if (this.state.value !== '')  {
     const { authUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authUser, question.id, this.state.value);
   }

  };

  render() {
    const { question } = this.props;
    const { value } = this.state
    return (
      <Fragment>
        <Container>
        <Heading as="h4" size="md">Would you rather</Heading>
        <form onSubmit={this.onhandleSubmit}>
          <Stack>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              isChecked={value === 'optionOne'}
              onChange={this.onhandleChange}
            />
            <br />
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              isChecked={value === 'optionTwo'}
              onChange={this.onhandleChange}
            />
          </Stack>
          <Stack>
            <Button
              colorScheme="green"
              size="lg"
              fluid
              positive 
              >
                Submit</Button>
          </Stack>
        </form>
        </Container>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(  mapStateToProps,{ handleSaveQuestionAnswer })(PollQuestion);

