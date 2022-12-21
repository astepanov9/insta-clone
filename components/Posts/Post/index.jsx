import React from 'react';
import Image from 'next/image';
import Moment from 'react-moment';
import SkeletonPost from '../../SkeletonPost';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSession } from "next-auth/react"

const Post = ({ id, userName, userImg, postPhoto, caption, timestamp }) => {
  const [hasLiked, setHasLiked] = React.useState(false);
  const [likes, setLikes] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [commentsFull, setCommenstFull] = React.useState(false);
  const { data: session } = useSession();

  React.useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'),
      (snapshot) =>
        setLikes(snapshot.docs)
    )
  }, [hasLiked]);

  React.useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    )
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
          username: session?.user?.name,
        });
      }
    } else {
      return
    }
  };

  React.useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => setComments(snapshot.docs)
    ),
      [(db, id)]
  }, []);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment('');
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session?.user?.name,
      image: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className='mx-1 mb-5'>
      <div className='flex items-center justify-between border p-3 rounded-t-md bg-white'>
        <div className='flex items-center'>
          <Image src={userImg} className='rounded-full mr-2 cursor-pointer p-[1.5px] border-[2px] border-[#d62976]' width={45} height={45} alt="Profile" />
          <div className='flex flex-col'>
            <span className='font-medium text-sm cursor-pointer'>{userName}</span>
            <p className='font-light text-xs'>Original audio</p>
          </div>
        </div>
        <div>
          <svg className='cursor-pointer' aria-label="Дополнительно" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </div>
      </div>
      <div>
        {
          postPhoto ? <img src={postPhoto} alt="Post" className="max-h-[462px] w-[100%] object-cover" /> : <SkeletonPost />
        }
      </div>
      <div className='rounded-b-md bg-white p-3 border'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <div className='Btn group' onClick={likePost}>
              {
                hasLiked ? <svg aria-label="Не нравится" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> : <svg className="group-hover:opacity-50" aria-label="Уведомления" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
              }
            </div>
            <div className='Btn group'>
              <svg className="group-hover:opacity-50" aria-label="Комментировать" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <div className='Btn group'>
              <svg className="group-hover:opacity-50" aria-label="Поделиться публикацией" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
            </div>
          </div>
          <div className='Btn group'>
            <svg className="group-hover:opacity-50" aria-label="Сохранить" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
          </div>
        </div>
        <div className='mt-2'>
          <p className='font-medium text-sm'>{likes.length} likes</p>
        </div>
        <div className='mt-2 flex'>
          <p className='text-sm font-medium cursor-pointer mr-1 whitespace-nowrap'>{userName}</p>
          <p className='text-sm'>{caption}</p>
        </div>
        <div className='mt-2 flex'>
          {comments.length >= 3 ? <p className='text-sm text-gray-500 mr-1 cursor-pointer' onClick={() => setCommenstFull(!commentsFull)}>
            View all comments
          </p> : <p className='text-sm text-gray-500 mr-1'>
            Comments
          </p>}

          <span className='text-sm text-gray-500 cursor-pointer'>{comments.length}</span>
        </div>
        <div className='mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200' style={commentsFull ? { 'max-height': '15rem' } : { 'max-height': '5rem' }}>
          {
            comments.map((comment) => (
              <div key={comment.data().comment} className='flex justify-between mb-2'>
                <div className='flex'>
                  <p className='text-sm font-medium cursor-pointer mr-1'>{comment.data().username}</p>
                  <p className='text-sm'>{comment.data().comment}</p>
                </div>
                <div className='mx-3'>
                  <svg aria-label="Уведомления" className='w-[12px] h-[12px] cursor-pointer' color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                </div>
              </div>
            ))
          }
        </div>
        <div className='mt-2'>
          <p className='text-xs text-gray-500 cursor-pointer'><Moment fromNow>{timestamp?.toDate()}</Moment></p>
        </div>
        <div className='mt-2 border-t -mx-3'></div>
        <div className='mt-3 flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <svg aria-label="Смайлик" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
            </div>
            <div>
              <input type='text' className='outline-none text-sm' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
          </div>
          <button className='text-[#3AACF7] text-sm font-semibold whitespace-nowrap' onClick={sendComment}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
