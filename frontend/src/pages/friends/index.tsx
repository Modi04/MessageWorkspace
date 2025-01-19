import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { profileExample } from '../../db/userProfile';

export default function Index() {
  const router = useRouter();

  return (
    <div className="bg-black">
      <div className="text-white text-3xl mb-5 mt-3">Friends</div>
      {profileExample.map((message, index) => (
        <Card key={index} message={message} />
      ))}
    </div>
  );
}
