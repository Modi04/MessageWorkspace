import { useRouter } from 'next/router';
export default function MyPage() {
  const router = useRouter();

  return <div className="text-white">Hello!</div>;
}
