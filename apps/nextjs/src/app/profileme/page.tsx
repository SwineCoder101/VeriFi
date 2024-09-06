"use client"; // Add this directive at the top

import Card from '@/components/Card';
import { useAuth } from '@/context/Web3AuthContext';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';

const ProfileMe = () => {
  const { userInfo, isConnected, walletDetails, getBalance, getAccounts, setWalletDetails, withdrawFunds } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (isConnected && !walletDetails) {
        const balance = await getBalance();
        const addresses = await getAccounts();
        setWalletDetails({ address: addresses?.[0] || '', balance: balance || '0' });
      }
    };

    fetchWalletDetails();
  }, [isConnected, walletDetails, getBalance, getAccounts, setWalletDetails]);

  const handleWithdraw = async () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      await withdrawFunds(withdrawAmount);
      const balance = await getBalance();
      setWalletDetails({ ...walletDetails, balance: balance || '0' });
    }
  };

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
      <Card title="Profile" description="Here is your VeriFi Profile, add more reviews comments to boost your reputation and score! The higher the score the more Vault Tokens you have.">
        <div>
          {isConnected ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div>
                <p><strong>Name:</strong> {userInfo?.name}</p>
                <p><strong>Email:</strong> {userInfo?.email || "profileemail@gmail.com"}</p>
                <img src={userInfo?.profileImage} alt="Profile" width={100} />
              </div>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </Card>
      <Card title="Wallet" description="Deposit and Withdraw funds">
        <div>
          {isConnected ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div>
                <p><strong>Wallet Address:</strong> {walletDetails?.address || "0x71a7a28488E39717c0ECcAEF15Ed62A47A55C44d"}</p>
                <p><strong>Balance:</strong> {walletDetails?.balance}</p>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Amount to withdraw"
                  style={{ marginRight: '10px' }}
                />
                <button onClick={handleWithdraw}>Withdraw</button>
              </div>
            </div>
          ) : (
            <p>Loading wallet info...</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProfileMe;