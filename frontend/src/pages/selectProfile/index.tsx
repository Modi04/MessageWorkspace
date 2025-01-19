import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { useParams } from 'next/navigation';

export default function Index() {
  const router = useRouter();
  const [caliContext, setCaliContext] = useState();
  const [isContextSelected, setIsContextSelected] = useState(false);

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center text-black">
      {isContextSelected ? (
        <UserList contents="profile" />
      ) : (
        <UserList contents="organization" />
      )}
    </div>
  );
}
