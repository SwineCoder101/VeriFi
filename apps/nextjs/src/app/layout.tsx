import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'; // Import global CSS here if you have one
import { Web3AuthContext } from '../context/Web3AuthContext'; // Import the AuthProvider
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'VerFi - Decentralized Reviewing Platform',
  description: 'VerFi is a decentralized platform for reviewing companies and building reputation on the blockchain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <Web3AuthContext>
          <body style={bodyStyle}>
            <Header />
            <div style={contentStyle}>
              {children}
            </div>
            <Footer />
          </body>
        </Web3AuthContext>
      </UserProvider>
    </html>
  );
}

const bodyStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  margin: 0,
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};