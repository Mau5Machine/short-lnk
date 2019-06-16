import React from 'react';
import { Container } from 'semantic-ui-react';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default Link = () => {
  return (
    <div>
      <Container>
        <PrivateHeader title="Your Stored Links" />
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </Container>
    </div>
  );
}