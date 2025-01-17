import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <div className="fixed w-full h-10 flex text-black">
      <div className="w-1/4 max-w-[378px]"></div>
      <div className="bg-slate-400 flex-1"></div>
    </div>
  );
}
