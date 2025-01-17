import { SetupModal } from '@calimero-is-near/calimero-p2p-sdk';
import { useRouter } from 'next/router';
import ContentWrapper from '../../components/login/ContentWrapper';
import { getNodeUrl, getStorageApplicationId } from '../../utils/node';
import {
  setAppEndpointKey,
  setStorageApplicationId,
} from '../../utils/storage';
import WithIdAuth from '../../components/auth/auth';

export default function SetupPage() {
  const router = useRouter();

  return (
    <WithIdAuth>
      <ContentWrapper>
        <SetupModal
          successRoute={() => router.push('/auth')}
          getNodeUrl={getNodeUrl}
          setNodeUrl={setAppEndpointKey}
          setApplicationId={setStorageApplicationId}
          getApplicationId={getStorageApplicationId}
        />
      </ContentWrapper>
    </WithIdAuth>
  );
}
