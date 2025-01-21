import { useRouter } from 'next/router';
import { chatExample } from '../../db/chat';
import { useCallback, useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { getContextId, getIdentity } from '../../utils/storage';
import { ViewChats } from '../../api/clientApi';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';

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
  const [identity, setIdentity] = useState<string | null>(null); // 타입 지정 및 초기값
  const [context, setContext] = useState<string | null>(null); // 타입 지정 및 초기값
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 비동기 정보 가져오는 함수
  async function getInfo() {
    try {
      const id = await getIdentity();
      setIdentity(id);

      const cont = await getContextId();
      setContext(cont);
    } catch (error) {
      console.error('Error fetching info:', error);
      setError('Failed to fetch identity or context.');
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  const fetchChats = useCallback(async (request: ViewChats) => {
    setLoading(true); // 로딩 상태 시작
    try {
      const response = await new ClientApiDataSource().fetchChats(request);
      if (response.error) {
        setError(response.error.message);
      } else {
        setChats(response?.data?.slice().reverse());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  }, []);

  useEffect(() => {
    const signGetPostRequest = async () => {
      if (identity && context) {
        // identity와 context가 정의되어 있는지 확인
        const fetchRequest: ViewChats = {
          user_id: identity,
          context_id: context,
        };
        await fetchChats(fetchRequest);
      }
    };
    signGetPostRequest();
  }, [identity, context, fetchChats]); // 필요한 종속성 추가

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
          contents={chats}
          setIsSelected={setIsSelected}
          setValue={setChatId}
        />
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
