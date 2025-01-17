import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[600px] fixed bottom-0 h-10 bg-slate-300 flex justify-around items-center">
      <div className="w-4 h-4 rounded-full bg-green-500"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
      <div className="w-4 h-4 rounded-full bg-red-500"></div>
    </div>
  );
}
