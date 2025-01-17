import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();

  return (
    <div className="fixed h-screen w-1/4 max-w-[378px] bg-white text-white">
      <div className="bg-white text-black">Menu!!!!</div>
    </div>
  );
}
