import React from 'react';
import { connect } from 'react-redux';
import { Text, Heading, Box, Stack} from '@chakra-ui/react'

const Leaderboard = props => {
  const { users } = props;
  const names = users ? Object.keys(users) : null;
  const formated =
    names !== null
      ? names
          .map(name => ({
            id: users[name].id,
            name: users[name].name,
            asked: users[name].questions.length,
            answered: Object.keys(users[name].answers).length,
            total: Object.keys(users[name].answers).length + users[name].questions.length,
            avatar: users[name].avatarURL,
          }))
          .sort((a, b) => b.total - a.total)
      : [];
  return (
    <Box >
      {!formated.length ? null : formated.map(name => <UserScore key={name.id} name={name} />)}
    </Box>
  );
};

const UserScore = props => {
    const { name } = props;
    return (
      <Stack key={name.id} >
        <Box>
          <img  src={name.avatar} alt={`${name.name}'s avatar`} />
        </Box>
        <Box >
          <Heading >{name.name}</Heading>
          <Text>
            <span>Answered questions</span>
            <span>{name.answered}</span>
          </Text>
          <Text >
            <span>Created questions</span>
            <span>{name.asked}</span>
          </Text>
        </Box>
        <Box >
          <Text>score</Text>
          <Box >{name.total}</Box>
        </Box>
      </Stack>
    );
  };

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Leaderboard);

