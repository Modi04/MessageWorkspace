import { useRouter } from 'next/router';
import { MdOutlinePersonOutline, MdSettings } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { useEffect, useState } from 'react';

export default function Footer() {
  const router = useRouter();

  const [isSelected, setIsSelected] = useState({
    friends: false,
    messages: false,
    settings: false,
  });

  useEffect(() => {
    if (router.pathname === '/friends') {
      setIsSelected({friends: true, messages: false, settings: false});
    } else if (router.pathname === '/messages') {
      setIsSelected({friends: false, messages: true, settings: false});
    } else if (router.pathname === '/settings') {
      setIsSelected({friends: false, messages: false, settings: true});
    }
    }, [router.pathname]);

  const handleNavigation = (path: string, menu: keyof typeof isSelected) => {
    if (router.pathname === path) return;
    router.push(path);
    setIsSelected({
      friends: menu === 'friends',
      messages: menu === 'messages',
      settings: menu === 'settings',
    });
  };

  return (
    <div className="w-full max-w-[600px] fixed bottom-0 h-20 bg-[#211F26] flex justify-around items-center">
      <div className="flex flex-col items-center cursor-pointer"
      onClick={() => handleNavigation('/friends', 'friends')}>
      <div className={`flex justify-center items-center ${isSelected.friends ? 'bg-gray-300 bg-opacity-30 rounded-3xl' : ''} w-16 h-10 p-2`}>
        <MdOutlinePersonOutline size='24' />
      </div>
        <p>Friends</p>
      </div>
     <div className="flex flex-col items-center cursor-pointer"
     onClick={() => handleNavigation('/messages', 'messages')}>
     <div className={`flex justify-center items-center ${isSelected.messages ? 'bg-gray-300 bg-opacity-30 rounded-3xl' : ''} w-16 h-10 p-2`}>
        <FiMessageSquare  size='24' />
      </div>
        <p>Message</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer"
      onClick={() => handleNavigation('/settings', 'settings')}>
      <div className={`flex justify-center items-center ${isSelected.settings ? 'bg-gray-300 bg-opacity-30 rounded-3xl' : ''} w-16 h-10 p-2`}>
        <MdSettings  size='24' />
      </div>
        <p>Setting</p>
      </div>
    </div>
  );
}
