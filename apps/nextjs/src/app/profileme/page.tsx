"use client"; // Add this directive at the top

import { useAuth } from '@/context/Web3AuthContext';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import { use, useEffect } from 'react';

const ProfileMe = () => {
  const { userInfo, isConnected, walletDetails, getBalance, getAccounts, setWalletDetails } = useAuth();


  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (isConnected && !walletDetails) {
        const balance = await getBalance();
        const addresses = await getAccounts();
        setWalletDetails({ address: addresses?.[0] || '', balance: balance || '0' });
      }
    };

    fetchWalletDetails();
  }, [isConnected, walletDetails]);



  const getLinkedinProfileMock = (userInfo: Partial<OpenloginUserInfo>) => {
    return {
      id: "123456789",
      localizedFirstName: "John",
      localizedLastName: "Doe",
      headline: "Software Engineer at Example Corp",
      profilePicture: {
        displayImage: "https://media.licdn.com/dms/image/v2/C4D03AQE79Q_bdXyY4Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1516249740869?e=1730937600&v=beta&t=u_bvyHdFb2ciss6U0u_5lMfHC0AuSEcxpa7GO6CcFfA",
      },
    };
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Profile Me</h1>
        <>
          <div>
            <h2>User Information</h2>
            {isConnected ? (
              <div>
                <p><strong>Name:</strong> {userInfo?.name}</p>
                <p><strong>Email:</strong> {userInfo?.email}</p>
                <img src={userInfo?.profileImage} alt="Profile" width={100} />
              </div>
            ) : (
              <p>Loading user info...</p>
            )}
          </div>
          <div>
            <h2>Wallet Information</h2>
            {isConnected ? (
              <div>
                <p><strong>Wallet Address: </strong> {walletDetails?.address}</p>
                <p><strong>Balance: </strong> {walletDetails?.balance }</p>
              </div>
            ) : (
              <p>Loading LinkedIn profile...</p>
            )}
          </div>
        </>
    </div>
  );
};

export default ProfileMe;