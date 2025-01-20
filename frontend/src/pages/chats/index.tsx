import { useRouter } from 'next/router';
import { chatExample } from '../../db/chat';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';

export default function Index() {
  const router = useRouter();

  const { identity } = router.query;

  const [friendsIdentity, setFriendsIdentity] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: `/messages/${identity}and${friendsIdentity}`, // 이동할 경로
      });
    }
  }, [isSelected]);

  return (
    <div className="bg-black">
      <UserList
        title="Chats"
        contents={chatExample}
        setIsSelected={setIsSelected}
        setValue={setFriendsIdentity}
      />
    </div>
  );
}
