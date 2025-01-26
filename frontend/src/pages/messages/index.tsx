import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { messagesExample } from '../../db/messages';
import MessageBox from './MessageBox';
import MesssageInput from './MessageInput';
import { IoIosArrowBack } from "react-icons/io";

const MessagePage = () => {
  const router = useRouter();
  const { identity, friendsIdentity, context } = router.query;

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <div className="fixed flex w-full max-w-[600px] items-center justify-between p-4 bg-[#1C1C1D] text-white">
        <button
          className="text-lg font-bold flex items-center justify-center w-10 h-10 bg-[#787878] rounded-full"
          onClick={() =>
            router.push({
              pathname: '/chats',
              query: { identity: identity, context: context },
            })
          }
        >
          <IoIosArrowBack size={32}/>
        </button>
        <div className='flex flex-col items-center'>
          <div className="text-xl font-bold">Name</div>
          <div className='text-sm text-[#787878]'>last seen just now</div>
        </div>
        <div className="text-lg font-mono flex items-center justify-center w-10 h-10 bg-[#14C0FF] rounded-full">
          U
        </div>
      </div>
      <div className="p-4 pt-[90px]">
        <div className="space-y-4">
          {messagesExample.map((message, idx) => (
            <MessageBox
              key={message.messageId}
              // isUser={message.userId === identity}
              isUser={idx % 2 == 0}
              profile={message.userId === friendsIdentity ? 'F' : 'U'} // 임의로 프로필 이니셜 설정
              contents={message.content}
            />
          ))}
        </div>
      </div>

      <MesssageInput
        inputval={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default MessagePage;
