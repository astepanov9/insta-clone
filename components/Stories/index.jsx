import React from 'react';
import { faker } from '@faker-js/faker';

import Story from './Story';

const Stories = () => {
  const [stori, setStori] = React.useState([]);

  React.useEffect(() => {
    setStori(
      [...Array(30)].map((profile) => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);

  return (
    <div className="mx-auto">
      <div className="space-x-4 overflow-x-scroll flex bg-white border mx-1 py-5 px-1 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
        {stori.map((profile) => (
          <Story key={profile.userId} username={profile.username} avatar={profile.avatar} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
