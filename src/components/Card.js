import React, {Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Stack, Heading, SimpleGrid, Avatar} from '@chakra-ui/react'
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import PollTeaser from './PollTeaser';


const pollTypes = {
  POLL_TEASER: 'POLL_TEASER',
  POLL_QUESTION: 'POLL_QUESTION',
  POLL_RESULT: 'POLL_RESULT'
};

const QuestionContent = props => {

const { pollType, question, unanswered} = props;

if(pollType === pollTypes.POLL_TEASER) {
  return <PollTeaser question={question} unanswered={unanswered} />;
}
else if(pollType === pollTypes.POLL_QUESTION){
  return <PollQuestion question={question} />;
}
else if (pollType === pollTypes.POLL_RESULT){
  return <PollResult question={question} />;
}
else{
  return {
    pollType, question, unanswered
  }
} 

} 

export class Card extends Component {

render() {
  const {
    author, question,  pollType, badPath,  unanswered = null} = this.props;


  if (badPath === true) {
    return <Redirect to="/questions/bad_id" />;
  }
  return (
    <React.Fragment>
     <SimpleGrid columns={1}>
        <Stack isInline spacing={8} align="center">
          <Avatar mx={4} size="md" name={author.name} src={author.avatarURL} />
          <Heading textAlign="center" as="h5" size="lg">
            {author.name} asks:
          </Heading>
        </Stack>
        <QuestionContent
          pollType={pollType}
          question={question}
          unanswered={unanswered}
        />
      </SimpleGrid>
  </React.Fragment>
  );
}
}


function mapStateToProps({ users, questions, authUser }, { match, question_id }){
  return {
    users, questions, authUser,match, question_id,
  }
}
    
export default connect(mapStateToProps)(Card); 

