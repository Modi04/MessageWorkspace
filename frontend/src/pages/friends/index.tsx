import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { fetchMembers } from '../../api/icp/context';
import AddFriendsPopup from './AddFriends';
import { getJWTObject } from '../../utils/storage';

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

  const [friendsIdentity, setFriendsIdentity] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [members, setMembers] = useState<FetchMembersResponse | null>(null); // 초기값을 명시적으로 설정
  const [loading, setLoading] = useState(true);

  const jowtObject = getJWTObject();

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: `/messages/${jowtObject.executor_public_key}and${friendsIdentity}`,
      });
    }
  }, [isSelected]);

  const getMembers = async (contextId: string) => {
    try {
      const dbUserIdentities: FetchMembersResponse =
        await fetchMembers(contextId);
      setMembers(dbUserIdentities);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      setMembers(null);
    }
  };

  useEffect(() => {
    if (typeof jowtObject.context_id === 'string') {
      getMembers(jowtObject.context_id);
    }
  }, [jowtObject.context_id]);

  return (
    <div className="bg-black">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserList
          title="Friends"
          contents={members.members} // members가 null일 경우 profileExample 사용
          setIsSelected={setIsSelected}
          setValue={setFriendsIdentity}
        />
      )}

      <AddFriendsPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        handleButtonClick={undefined}
      />
    </div>
  );
}
