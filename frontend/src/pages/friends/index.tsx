import { useRouter } from 'next/router';
import Card from '../../components/Card';

export default function Index() {
  const router = useRouter();

  return (
    <div className="text-white text-center">
      <Card></Card>
      <div>Hello!!!!</div>
    </div>
  );
}
