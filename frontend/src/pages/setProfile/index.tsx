import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { useParams } from 'next/navigation';
import { contextExample } from '../../db/context';
import { identityExample } from '../../db/Identity';

export default function Index() {
  const router = useRouter();
  const [caliContext, setCaliContext] = useState('');
  const [isContextSelected, setIsContextSelected] = useState(false);
  const [identity, setIdentity] = useState('');
  const [isIdentitySelected, setIsIdentitySelected] = useState(false);

  useEffect(() => {
    if (isContextSelected && isIdentitySelected) {
      router.push({
        pathname: '/friends', // 이동할 경로
        query: { context: caliContext, identity: identity }, // 전달할 쿼리
      });
    }
  }, [isContextSelected, isIdentitySelected]);

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center text-black">
      <div className="w-5/6 h-2/3 overflow-y-auto scrollbar-hidden border-2 rounded-3xl border-[#A4FF11]">
        {isContextSelected ? (
          <UserList
            title="Select your profile"
            contents={identityExample}
            setIsSelected={setIsIdentitySelected}
            setValue={setIdentity}
          />
        ) : (
          <UserList
            title="Select your organization"
            contents={contextExample}
            setIsSelected={setIsContextSelected}
            setValue={setCaliContext}
          />
        )}
      </div>
    </div>
  );
}
