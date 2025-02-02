// DefaultLayout.tsx
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import Footer from './Footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();

  return (
    <div className="w-full h-screen bg-black text-white">
      {route.pathname === '/' || route.pathname.includes('/messages') ? (
        <div></div>
      ) : (
        <Footer />
      )}
      <div>{children}</div>
    </div>
  );
}
