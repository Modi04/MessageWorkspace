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
        <div className="w-[200px] h-[100px] bg-black"></div>
        <ClientLogin
          getNodeUrl={getNodeUrl}
          getApplicationId={getStorageApplicationId}
          sucessRedirect={() => router.push('/friends')}
        />
        <button
          className="mt-4 w-full bg-green-500 text-black px-4 py-2"
          onClick={() => router.push('/setProfile')}
        >
          V2 Login!
        </button>
      </div>
    </div>
  );
}
