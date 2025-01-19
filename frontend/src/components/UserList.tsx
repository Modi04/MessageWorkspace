import { useRouter } from 'next/router';
import Card from './Card';
import { profileExample } from '../db/userProfile';

export default function UserList({ contents }) {
  const router = useRouter();

  return (
    <div className="w-5/6 h-fit max-h-5/6 border-2 rounded-3xl border-[#A4FF11]">
      <div className="p-5 ">
        <div className="text-[18px] font-bold border-b border-green-300 pb-3 text-white">
          Select your {contents}
        </div>
        {profileExample.map((message, index) => (
          <Card key={index} message={message} />
        ))}
      </div>
    </div>
  );
}
