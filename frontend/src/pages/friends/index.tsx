import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { fetchMembers } from '../../api/icp/context';
import AddFriendsPopup from './AddFriends';
import { getContextId, getIdentity } from '../../utils/storage';

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

  const [identity, setIdentity] = useState(null); // 초기값 null로 설정
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);
  // 비동기 정보 가져오는 함수
  async function getInfo() {
    try {
      const id = await getIdentity(); // getIdentity 호출
      setIdentity(id); // identity 상태 업데이트

      const cont = await getContextId(); // getContextId 호출
      setContext(cont); // context 상태 업데이트
    } catch (error) {
      console.error('Error fetching info:', error);
    }
  }

  useEffect(() => {
    getInfo(); // useEffect에서 getInfo 호출
  }, []);

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
      setLoading(false);
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
