import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { profileExample } from '../../db/userProfile';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { HiPencil } from 'react-icons/hi';
import { fetchMembers } from '../../api/icp/context';
import AddFriendsPopup from './AddFriends';

// 타입 정의 (예시)
interface Member {
  id: string;
  address: string;
  profileImageUrl: string;
  description: string;
}

interface FetchMembersResponse {
  members: Member[];
}

export default function Index() {
  const router = useRouter();

  const { identity, context } = router.query;

  const [friendsIdentity, setFriendsIdentity] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [members, setMembers] = useState<FetchMembersResponse | null>(null); // 초기값을 명시적으로 설정

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: `/messages`,
        query: { identity, friendsIdentity, context },
      });
    }
  }, [isSelected]);

  const getMembers = async (contextId: string) => {
    try {
      const dbUserIdentities: FetchMembersResponse =
        await fetchMembers(contextId);
      setMembers(dbUserIdentities);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setMembers(null);
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
        title="Friends"
        contents={members?.members || profileExample} // members가 null일 경우 profileExample 사용
        setIsSelected={setIsSelected}
        setValue={setFriendsIdentity}
      />
      <AddFriendsPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        handleButtonClick={undefined}
      />
    </div>
  );
}
