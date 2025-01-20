import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { profileExample } from '../../db/userProfile';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';

export default function Index() {
  const router = useRouter();

  const { identity } = router.query;

  const [friendsIdentity, setFriendsIdentity] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  console.log(friendsIdentity);

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: `/messages/${identity}and${friendsIdentity}`, // 이동할 경로
        query: { identity: identity },
      });
    }
  }, [isSelected]);

  return (
    <div className="bg-black">
      <UserList
        title="Friends"
        contents={profileExample}
        setIsSelected={setIsSelected}
        setValue={setFriendsIdentity}
      />
    </div>
  );
}
