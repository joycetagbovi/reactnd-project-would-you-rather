import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Heading, Progress, Box, Label, Button, IconButton, CheckedIcon, Text} from '@chakra-ui/react';

const YourVoteLabel = () => (
  <Label >
    <IconButton icon={<CheckedIcon />}  colorScheme="green" />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

export class PollResult extends Component {

  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];


    return (
      <Fragment>
        <Heading as="h3">
          Results:
          <Heading style={{ fontWeight: 'bold' }}>
            Would you rather
          </Heading>
        </Heading>
        <Box
          colorScheme="blue"
         
        >
          {userVote === 'optionOne' && <YourVoteLabel />}
          <Text> {question.optionOne.text}</Text>
          <Progress
            percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
            progress
          
          >
            {optionOneVotes} out of {votesTotal} votes
          </Progress>
        </Box>
        <Box
         
        >
          {userVote === 'optionTwo' && <YourVoteLabel />}

          <Text>{question.optionTwo.text}</Text>
          <Progress
            percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
            progress
          
          >
            {optionTwoVotes} out of {votesTotal} votes
          </Progress>
        </Box>
       
        <Button size="tiny" floated="right" onClick={this.handleClick}>
          Back
        </Button>
      
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));
