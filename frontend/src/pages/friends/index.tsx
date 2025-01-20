import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { profileExample } from '../../db/userProfile';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { HiPencil } from "react-icons/hi";

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
      <button className='flex items-center fixed bottom-[15vh] left-[59vw] bg-[#E8DEF9] text-[#65558F] py-[14px] px-[14px] rounded-[15px]'>
        <HiPencil className="text-2xl mr-4"/>
        <p className='text-sm font-bold'>Add friends</p>
      </button>
    </div>
  );
}
