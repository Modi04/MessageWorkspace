// DefaultLayout.tsx
import Menu from '../components/Menu';
import Header from '../components/Header';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white flex">
      {/* Fixed Menu */}
      <Menu />

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <div className="pt-10 pl-[calc(25%)] w-full h-full relative">
          {children}
        </div>
      </div>
    </div>
  );
}
