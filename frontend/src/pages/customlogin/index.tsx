import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserList from '../../components/UserList';

export default function Index() {
  const router = useRouter();

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center text-black">
      <UserList></UserList>
    </div>
  );
}
