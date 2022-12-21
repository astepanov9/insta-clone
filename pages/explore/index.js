import React from 'react';

import Meta from '../../components/Meta';
import Header from '../../components/Header';
import FeedExplore from '../../components/FeedExplore';

const Explore = () => {
  return (
    <div className="wrapper">
      <Meta title="Explore - Insta Clone" description="Insta Clone Explore page" />
      <Header />
      <FeedExplore />
    </div>
  );
};

export default Explore;
