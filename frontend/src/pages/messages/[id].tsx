import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      <p>User {user}</p>
      <p>Friends {friend}</p>
    </div>
  );
};

export default MessagePage;
