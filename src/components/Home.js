import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Card from './Card';

export class Home extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired
  };
  render() {
    const { userQuestionData } = this.props;
 
return(
  <div className='container'>
  <Tabs>
    <TabList>
      <Tab>Unanswered</Tab>
      <Tab>Ananswered</Tab>
    </TabList>

    <TabPanel>
      {userQuestionData.answered.map(question => (
            <Card
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}</TabPanel>
    <TabPanel> 
      {userQuestionData.unanswered.map(question => (
            <Card
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}</TabPanel>
  </Tabs>
</div>

);
      }
    }





function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Home);
