import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { profileExample } from '../../db/userProfile';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { HiPencil } from 'react-icons/hi';
import { fetchMembers } from '../../api/icp/context';

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

  const [friendsIdentity, setFriendsIdentity] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [members, setMembers] = useState<FetchMembersResponse | null>(null);

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
        contents={members?.members || profileExample}
        setIsSelected={setIsSelected}
        setValue={setFriendsIdentity}
      />
      {/* Add Friends 버튼 */}
      <button className="fixed flex items-center bottom-[120px] ml-[420px] bg-[#E8DEF9] text-[#65558F] py-[14px] px-[14px] rounded-[15px]">
        <HiPencil className="text-2xl mr-4" />
        <p className="text-sm font-bold">Add friends</p>
      </button>
    </div>
  );
}
