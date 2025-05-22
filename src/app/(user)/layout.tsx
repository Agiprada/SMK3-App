import Navbar from '@/components/user/Navbar';
import Footer from '@/components/user/Footer';
import SessionWrapper from '@/components/SessionWrapper'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SessionWrapper>
      <Navbar />
      <main className="flex-grow container mx-auto py-8">
      
        {children}
      
      </main>
      </SessionWrapper>
      <Footer />
    </div>
  );
}