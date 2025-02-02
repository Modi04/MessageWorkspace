import { useRouter } from 'next/router';
import { getNodeUrl, getStorageApplicationId } from '../utils/node';
import { ClientLogin } from '@calimero-is-near/calimero-p2p-sdk';
import { useEffect } from 'react';
import { setContextId, setIdentity } from '../utils/storage';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    setContextId('');
    setIdentity('');
  }, []);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <img className="w-3/4" src="logo.png" alt="Loading..." />
        <ClientLogin
          getNodeUrl={getNodeUrl}
          getApplicationId={getStorageApplicationId}
          sucessRedirect={() => router.push('/friends')}
        />
        <button
          className="mx-auto my-2 w-[266px] h-[46px] bg-[#FFFFFF] hover:bg-[#888888] text-black px-4 py-2 rounded-md"
          onClick={() => router.push('/setProfile')}
        >
          V2 Login!
        </button>
      </div>
    </div>
  );
}
