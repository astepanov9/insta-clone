import Meta from '../components/Meta';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Preloader from '../components/Preloader';

import React from 'react';

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="wrapper">
      <Meta title="Insta Clone" description="Insta Clone Home page" />
      <Header />
      <Feed />
    </div>
  );
}
