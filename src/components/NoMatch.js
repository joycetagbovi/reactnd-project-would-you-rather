import React, { Component } from 'react';
import { Container, Heading } from '@chakra-ui/react';

export class NoMatch extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Heading as="h3">No Match 404 Error</Heading>
        <p>Nothing to see here. Please use the menu to try again.</p>
      </Container>
    );
  }
}

export default NoMatch;
