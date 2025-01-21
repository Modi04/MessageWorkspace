import { useRouter } from 'next/router';
import { chatExample } from '../../db/chat';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { fetchChats } from '../../api/icp/chats';

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

  const { identity, context } = router.query;

  const [friendsIdentity, setFriendsIdentity] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [chats, setChats] = useState<FetchChatsResponse | null>(null);

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: '/messages',
        query: {
          identity,
          friendsIdentity,
          context,
        },
      });
    }
  }, [isSelected]);

  const getMembers = async (contextId: string) => {
    if (!identity || typeof identity !== 'string') {
      console.error('Identity is required and must be a string.');
      return;
    }

    try {
      const dbUserChats: FetchChatsResponse = await fetchChats(
        identity,
        contextId,
      );
      setChats(dbUserChats);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      setChats(null);
    }
  };

  useEffect(() => {
    if (typeof context === 'string') {
      getMembers(context);
    }
  }, [context]);

  return (
    <div className="bg-black">
      <UserList
        title="Chats"
        contents={chats?.chats || chatExample}
        setIsSelected={setIsSelected}
        setValue={setFriendsIdentity}
      />
    </div>
  );
}
