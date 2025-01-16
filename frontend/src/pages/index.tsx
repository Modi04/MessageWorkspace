import { useRouter } from 'next/router';
import Menu from '../components/Menu';

export default function Index() {
  const router = useRouter();

  return (
    <div className="text-white flex ">
      <Menu></Menu>
      <div className="mx-auto">
        <button
          className="text-center mx-auto my-auto"
          onClick={() => router.push('/setup')}
        >
          Login!
        </button>
      </div>
    </div>
  );
}
