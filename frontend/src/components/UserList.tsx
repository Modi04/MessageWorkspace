import { useRouter } from 'next/router';
import Card from './Card';
import { HiMiniBars3 } from 'react-icons/hi2';
import Sidebar from './Sidebar';
import { useState } from 'react';

export default function UserList({
  title,
  setIsSelected,
  setValue,
  contents,
  setShowAddFriend = undefined,
}) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const onCardClick = (value: string) => {
    setValue(value);
    setIsSelected(true);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center pt-8 ">
        <div className="text-[23px] px-4 text-[#E6E0E9]">{title}</div>
        <button
          className="ml-auto mr-4 my-auto"
          onClick={() => {
            setShowSidebar(true);
            setShowAddFriend(false);
          }}
        >
          <HiMiniBars3 size={24} />
        </button>
      </div>
      {contents.map((message, index) => (
        <div className="w-full border-b border-slate-800 py-2">
          <button
            className="w-full"
            key={index}
            onClick={() => onCardClick(message.id)} // 화살표 함수로 래핑
          >
            <Card message={message} />
          </button>
        </div>
      ))}
      {showSidebar ? (
        <Sidebar setShow={setShowSidebar} setShowAddFriend={setShowAddFriend} />
      ) : (
        <div />
      )}
    </div>
  );
}
