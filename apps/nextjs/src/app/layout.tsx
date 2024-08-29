import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'; // Import global CSS here if you have one

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
        <body>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}