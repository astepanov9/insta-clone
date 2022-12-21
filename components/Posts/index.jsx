import React from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Post from './Post';
import { db } from '../../firebase';
import Preloader from '../Preloader';

const Posts = () => {
  const [postData, setPostData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPostData(snapshot.docs);
      setLoading(false);
    });
    return () => unSubscribe();

  }, [db])

  if (loading) {
    return <Preloader />;
  }

  return (

    <div className="mt-5 mx-auto">
      {postData.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.data().username}
          userImg={post.data().profileImg}
          postPhoto={post.data().image}
          caption={post.data().caption}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
};

export default Posts;
