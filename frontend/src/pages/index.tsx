import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-[200px] h-[100px] bg-black"></div>
        <button
          className="mt-4 w-full bg-green-500 text-black px-4 py-2"
          onClick={() => router.push('/setup')}
        >
          Login with Admin Dashboard!
        </button>
        <button
          className="mt-4 w-full bg-green-500 text-black px-4 py-2"
          onClick={() => router.push('/setProfile')}
        >
          Idealized Login!
        </button>
      </div>
    </div>
  );
}
