import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { messagesExample } from '../../db/messages';
import MessageBox from './MessageBox';
import MesssageInput from './MessageInput';
import { getJWTObject } from '../../utils/storage';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';
import { Message } from '../../types/types';

const MessagePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 상태 타입 정의 및 초기값 설정
  const [messages, setMessages] = useState<Message[]>([]); // 빈 배열로 초기화
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setchatLoading] = useState(true);

  const jowtObject = getJWTObject();

  const fetchChat = useCallback(async () => {
    setchatLoading(true); // 로딩 상태 시작
    try {
      const response = await new ClientApiDataSource().fetchChat({
        chat_id: id as string,
      });
      if (response.error) {
        setError(response.error.message);
      } else {
        if (response.data && response.data.length > 0) {
        } else {
          // response.data가 없거나 빈 배열이면 createChats 호출
          console.log('Creating new chat...');
          await new ClientApiDataSource().createChats({
            id: id as string, // 타입 강제 변환
            name: (id as string).split('and')[1],
          });
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setchatLoading(false);
    }
  }, [id]);

  const fetchMessages = useCallback(async (request: { chat_id: string }) => {
    setLoading(true);
    try {
      const response = await new ClientApiDataSource().fetchMessages(request);
      if (response.error) {
        setError(response.error.message);
      } else {
        setMessages(response?.data?.slice().reverse());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      if (id) {
        const fetchRequest = {
          chat_id: id as string, // id를 string으로 캐스팅
        };
        await fetchMessages(fetchRequest);
      }
    };
    signGetPostRequest();
    fetchChat();
  }, [id, fetchMessages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      new ClientApiDataSource().createMessages({
        chat_id: id as string,
        content: inputValue,
      });
      setMessages([
        ...messages,
        {
          id: messages.length,
          chatId: id as string,
          user_id: jowtObject.executor_public_key,
          content: inputValue,
          createdAt: messages.length,
        },
      ]);
      setInputValue('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div className="fixed flex w-full max-w-[600px] items-center justify-between p-4 bg-[#1C1C1D] text-white">
        <button
          className="text-lg font-bold flex items-center justify-center w-10 h-10 bg-[#787878] rounded-full"
          onClick={() =>
            router.push({
              pathname: '/chats',
            })
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
          {(messages.length && messages).map((message, idx) => (
            <MessageBox
              key={message.id}
              isUser={message.user_id === jowtObject.executor_public_key}
              profile={
                message.user_id === jowtObject.executor_public_key ? 'F' : 'U'
              }
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
