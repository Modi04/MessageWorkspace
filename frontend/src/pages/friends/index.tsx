import { useRouter } from 'next/router';
import Card from '../../components/Card';

export default function Index() {
  const router = useRouter();

  return (
    <div className="bg-black">
      <div className='text-white text-3xl mb-5 mt-3'>Friends</div>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  );
}
