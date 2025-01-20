import { useRouter } from 'next/router';
import { MdOutlinePersonOutline, MdSettings } from 'react-icons/md';
import { FiMessageSquare } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Footer() {
  const router = useRouter();
  const { identity } = router.query;

  const handleNavigation = (path: string) => {
    if (router.pathname === path) return;
    router.push({ pathname: path, query: { identity: identity } });
  };

  return (
    <div className="w-full max-w-[600px] fixed bottom-0 h-20 bg-[#211F26] flex justify-around items-center">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleNavigation('friends')}
      >
        <div
          className={`flex justify-center items-center ${router.pathname == '/friends' ? 'bg-gray-300 bg-opacity-30 rounded-3xl' : ''} w-16 h-10 p-2`}
        >
          <MdOutlinePersonOutline size="24" />
        </div>
        <p>Friends</p>
      </div>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleNavigation('chats')}
      >
        <div
          className={`flex justify-center items-center ${router.pathname == '/chats' || router.pathname == '/messages' ? 'bg-gray-300 bg-opacity-30 rounded-3xl' : ''} w-16 h-10 p-2`}
        >
          <FiMessageSquare size="24" />
        </div>
        <p>Message</p>
      </div>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleNavigation('settings')}
      >
        <div
          className={`flex justify-center items-center ${router.pathname == '/settings' ? 'bg-gray-300 bg-opacity-30 rounded-3xl' : ''} w-16 h-10 p-2`}
        >
          <MdSettings size="24" />
        </div>
        <p>Setting</p>
      </div>
    </div>
  );
}
