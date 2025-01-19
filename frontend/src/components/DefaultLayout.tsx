// DefaultLayout.tsx
import Menu from '../components/Menu';
import Footer from './Footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-black text-white">
      <Footer />
      <div>{children}</div>
    </div>
  );
}
