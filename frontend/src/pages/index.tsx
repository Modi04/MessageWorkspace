import { useRouter } from 'next/router';

import { useEffect } from 'react';

export default function Friends() {
  const router = useRouter();

  useEffect(() => {
    router.push('/friends');
  }, []);
  return <div></div>;
}
