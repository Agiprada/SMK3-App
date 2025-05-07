import Navbar from '@/components/user/Navbar';
import Footer from '@/components/user/Footer';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}