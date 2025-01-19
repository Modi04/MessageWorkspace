import { useRouter } from 'next/router';

export default function UserList() {
  const router = useRouter();

  return (
    <div className="w-5/6 h-fit max-h-5/6 border-2 rounded-3xl border-purple-500">
      <div className="text-[18px] font-bold p-5 border-b border-purple-300">
        Select your Organization
      </div>
      <div className="w-4 h-4 rounded-full bg-green-500"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
      <div className="w-4 h-4 rounded-full bg-red-500"></div>
    </div>
  );
}
