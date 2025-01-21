import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { messagesExample } from '../../db/messages';
import MessageBox from './MessageBox';
import MesssageInput from './MessageInput';
import { getContextId, getIdentity } from '../../utils/storage';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';
import { Message } from '../../types/types';

const MessagePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 상태 타입 정의 및 초기값 설정
  const [messages, setMessages] = useState<Message[]>([]); // 빈 배열로 초기화
  const [inputValue, setInputValue] = useState('');
  const [identity, setIdentity] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 비동기 정보 가져오기
  const getInfo = async () => {
    try {
      const id = await getIdentity();
      setIdentity(id);

      const cont = await getContextId();
      setContext(cont);
    } catch (error) {
      console.error('Error fetching info:', error);
      setError('Failed to fetch identity or context.');
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const fetchMessages = useCallback(async (request: { chat_id: string }) => {
    setLoading(true);
    try {
      const response = await new ClientApiDataSource().fetchMessages(request);
      if (response.error) {
        setError(response.error.message);
      } else {
        setMessages(response.data || []); // 상태를 ViewChatMessages[]로 설정
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      if (id && identity && context) {
        const fetchRequest = {
          chat_id: id as string, // id를 string으로 캐스팅
        };
        await fetchMessages(fetchRequest);
      }
    };
    signGetPostRequest();
  }, [id, identity, context, fetchMessages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      console.log(inputValue); // 입력값 출력
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
              query: { identity, context },
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
          {(messages.length ? messages : messagesExample).map(
            (message, idx) => (
              <MessageBox
                key={message.id}
                isUser={message.user_id === identity}
                profile={message.user_id === identity ? 'F' : 'U'}
                contents={message.content}
              />
            ),
          )}
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
