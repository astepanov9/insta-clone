import React from 'react';
import { faker } from '@faker-js/faker';
import Photo from '../Photo';

const FeedExplore = () => {
  const [photo, setPhoto] = React.useState([]);

  React.useEffect(() => {
    setPhoto(
      [...Array(30)].map((profile) => ({
        userId: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);

  return (
    <div className="max-w-[790px] mt-4 mx-auto lg:max-w-[854px]">
      <div className="flex justify-center flex-wrap">
        {photo.map((profile) => (
          <Photo key={profile.userId} photo={profile.avatar} />
        ))}
      </div>
    </div>
  );
};

export default FeedExplore;
