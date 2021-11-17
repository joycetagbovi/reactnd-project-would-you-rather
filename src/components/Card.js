import React, {Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Box , Heading, GridItem, Image} from '@chakra-ui/react'
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
  const {author, question,  pollType, badPath, unanswered = null} = this.props;

  if (badPath === true) {
    return <Redirect to="/questions/bad_id" />;
  }
  return (
    <React.Fragment>
    <Heading
    size="md"
    >
      {author.name} asks:
    </Heading>

    <Grid  h="300px" templateRows="repeat(2, 1fr)"templateColumns="repeat(5, 1fr)"gap={2}>
      <GridItem>
        <Box>
          <Image src={author.avatarURL} />
        </Box>
        <Box>
        <QuestionContent
            pollType={pollType}
            question={question}
            unanswered={unanswered}
          />
        </Box>
      </GridItem>
    </Grid>
  </React.Fragment>
  );
}
}


function mapStateToProps({ users, questions, authUser }, { match, question_id })
{
  let question,author, pollType,  badPath = true;
  if (question_id !== undefined) {
    question = questions[question_id]; 
    author = users[question.author]; 
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { question_id } = match.params; 
    question = questions[question_id]; const user = users[authUser];
    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  }
    return {
      badPath,
      question,
      author,
      pollType
    }; 

   
  

}
    
export default connect(mapStateToProps)(Card); 

