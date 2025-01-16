import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();

  return (
    <div className="w-1/4 max-w-[378px] h-screen bg-white text-white">
      <div className="bg-white text-black">Hello!!!!</div>
    </div>
  );
}
