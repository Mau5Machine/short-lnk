import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default Link = () => {
  return (
    <div>
      <Container>
        <PrivateHeader title="Your Stored Links" />
        <LinksList />
        <AddLink />
      </Container>
    </div>
  );
}