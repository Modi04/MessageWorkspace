import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { contextExample } from '../../db/context';
import { identityExample } from '../../db/Identity';
import { fetchContexts, fetchIdentities } from '../../api/icp/context';

interface Identity {
  id: string;
  address: string;
  profileImageUrl: string;
  description: string;
}

interface FetchIdentitiesResponse {
  identities: Identity[];
}

interface FetchContextsResponse {
  contexts: { id: string; name: string }[];
}

export default function Index() {
  const router = useRouter();
  const [caliContext, setCaliContext] = useState('');
  const [isContextSelected, setIsContextSelected] = useState(false);
  const [identity, setIdentity] = useState('');
  const [isIdentitySelected, setIsIdentitySelected] = useState(false);
  const [userContexts, setUserContexts] =
    useState<FetchContextsResponse | null>(null);
  const [userContextIdentities, setUserContextIdentities] =
    useState<FetchIdentitiesResponse | null>(null);

  const exAddress = '0x123456789abcdef';

  useEffect(() => {
    if (isContextSelected && isIdentitySelected) {
      router.push({
        pathname: '/friends',
        query: { context: caliContext, identity: identity },
      });
    }
  }, [isContextSelected, isIdentitySelected]);

  const getContexts = async (address: string) => {
    const dbUserContexts: FetchContextsResponse = await fetchContexts(address);
    setUserContexts(dbUserContexts);
  };

  const getIdentities = async (address: string, contextId: string) => {
    const dbUserIdentities: FetchIdentitiesResponse = await fetchIdentities(
      address,
      contextId,
    );
    setUserContextIdentities(dbUserIdentities);
  };

  useEffect(() => {
    getContexts(exAddress);
  }, []);

  useEffect(() => {
    if (caliContext) {
      getIdentities(exAddress, caliContext);
    }
  }, [caliContext]);

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center text-black">
      <div className="w-5/6 h-2/3 overflow-y-auto scrollbar-hidden border-2 rounded-3xl border-[#A4FF11]">
        {isContextSelected ? (
          <UserList
            title="Select your profile"
            contents={userContextIdentities?.identities || identityExample}
            setIsSelected={setIsIdentitySelected}
            setValue={setIdentity}
          />
        ) : (
          <UserList
            title="Select your organization"
            contents={userContexts?.contexts || contextExample}
            setIsSelected={setIsContextSelected}
            setValue={setCaliContext}
          />
        )}
      </div>
    </div>
  );
}
