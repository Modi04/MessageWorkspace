import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { messagesExample } from '../../db/messages';
import MessageBox from './MessageBox';
const MessagePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState('');
  const [friend, setFriend] = useState('');

  useEffect(() => {
    const [userId, friendsId] = ((id as string) || '').split('and');
    setUser(userId);
    setFriend(friendsId);
  }, [id]);

  return (
    <div>
      <div className="fixed flex w-full items-center justify-between p-4 bg-[#1C1C1D] text-white">
        <button
          className="text-lg font-bold flex items-center justify-center w-10 h-10 bg-[#787878] rounded-full"
          onClick={() =>
            router.push({ pathname: '/chats', query: { identity: user } })
          }
        >
          ←
        </button>
        <div className="text-xl font-bold">Friend</div>
        <div className="text-lg font-mono flex items-center justify-center w-10 h-10 bg-[#14C0FF] rounded-full">
          U
        </div>
      </div>
      <div className="p-4 pt-[90px]">
        <div className="space-y-4">
          {messagesExample.map((message) => (
            <MessageBox
              key={message.messageId}
              isUser={message.userId === user}
              profile={message.userId === friend ? 'F' : 'U'} // 임의로 프로필 이니셜 설정
              contents={message.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
