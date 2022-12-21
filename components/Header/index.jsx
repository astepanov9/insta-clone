import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

import { openModal } from '../../redux/slice/modalSlice';
import { openDrawer } from '../../redux/slice/drawerSlice';
import logo from '../../assets/logo.png';
import down from '../../assets/down.png';
import search from '../../assets/search.png';
import Modal from '../Modal'
import DrawerNotifications from '../DrawerNotifications';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickAddPost = () => {
    dispatch(openModal(true));
  }

  const onCLickOpenDrawer = () => {
    dispatch(openDrawer(true));
  }

  const { data: session } = useSession()

  return (
    <div className="border-b shadow-sm bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-2 max-w-5xl mx-auto">
        <div className="flex items-center">
          <div className="w-28 h-full">
            <Image src={logo} alt="instagram" className="cursor-pointer" onClick={() => router.push('/')} />
          </div>
          <div className="w-3 h-3">
            <Image src={down} className="cursor-pointer" alt="down" />
          </div>
        </div>
        <div className="hidden md:flex items-center relative">
          <div className="absolute left-2">
            <Image src={search} className="w-3 h-3" alt="Search" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-inherit pl-7 w-72 h-9 rounded-md outline-none bg-[#efefef]"
          />
        </div>
        <div className="flex items-center justify-between space-x-5">
          <div className="Btn hidden sm:block" onClick={() => router.push('/')}>
            <svg
              aria-label="Главная"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div className="Btn hidden sm:block relative">
            <svg aria-label="Поделиться публикацией" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
            <div className="absolute -top-1 left-3.5 text-[#fff] text-xs rounded-full w-4 h-4 bg-red-500 flex justify-center items-center">1</div>
          </div>
          <div className="Btn">
            <svg
              onClick={onClickAddPost}
              aria-label="Новая публикация"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="6.545"
                x2="17.455"
                y1="12.001"
                y2="12.001"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="12.003"
                x2="12.003"
                y1="6.545"
                y2="17.455"
              ></line>
            </svg>
          </div>
          <div className="Btn hidden sm:block" onClick={() => router.push('/explore')}>
            <svg
              aria-label="Интересное"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <polygon
                fill="none"
                points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
              <polygon
                fillRule="evenodd"
                points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
              ></polygon>
              <circle
                cx="12.001"
                cy="12.005"
                fill="none"
                r="10.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
            </svg>
          </div>
          <div className="Btn hidden sm:block">
            <svg
              onClick={onCLickOpenDrawer}
              aria-label="Уведомления"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <div className="Btn">
              {
                session && <Image src={session?.user?.image} width={24} height={24} className="rounded-xl" alt="profile" />
              }
            </div>
            {
              session ? <button className="text-[#3AACF7] text-xs font-semibold whitespace-nowrap" onClick={() => signOut()}>Sign Out</button> : <button className="text-[#3AACF7] text-xs font-semibold whitespace-nowrap" onClick={() => signIn()}>Sign In</button>
            }
          </div>
        </div>
      </div>
      <Modal />
      <DrawerNotifications />
    </div>
  );
};

export default Header;
