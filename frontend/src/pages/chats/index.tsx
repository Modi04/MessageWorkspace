import { useRouter } from 'next/router';
import { chatExample } from '../../db/chat';
import { useCallback, useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { ViewChats } from '../../api/clientApi';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';
import { getJWTObject } from '../../utils/storage';
import { fetchUser } from '../../api/icp/user';

// 타입 정의 (예시)
interface Chat {
  chatRoomId: string;
  name: string;
}

interface FetchChatsResponse {
  chats: Chat[];
}

export default function Index() {
  const router = useRouter();

  const [chatId, setChatId] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [chats, setChats] = useState<FetchChatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await new ClientApiDataSource().fetchChats();
      if (response.error) {
        setError(response.error.message);
      } else {
        const updatedData = await Promise.all(
          response.data.map(async (chat: { id: string; name: string }) => {
            const userResponse = await fetchUser(chat.name);
            if (userResponse.error) {
              console.error(
                `Error fetching user profile for chat ID ${chat.id}:`,
                userResponse.error.message,
              );
              return chat;
            }
            return {
              ...chat,
              name: userResponse.name || chat.name,
            };
          }),
        );
        setChats({ chats: updatedData });
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch chats.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      await fetchChats();
    };
    signGetPostRequest();
  }, [fetchChats]); // 필요한 종속성 추가

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: `/messages/${chatId}`,
      });
    }
  }, [isSelected, chatId, router]); // 필요한 종속성 추가
  return (
    <div className="bg-black">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserList
          title="Chats"
          contents={chats ? chats.chats : chatExample}
          setIsSelected={setIsSelected}
          setValue={setChatId}
        />
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
