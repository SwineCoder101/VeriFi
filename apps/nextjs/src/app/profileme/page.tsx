"use client"; 

import Card from '@/components/Card';
import { useAuth } from '@/context/Web3AuthContext';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';
import { User, Mail, Wallet, DollarSign, Percent, CreditCard } from "lucide-react";

const ProfileMe = () => {
  const { userInfo, isConnected, walletDetails, getBalance, getAccounts, setWalletDetails, withdrawFunds } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');

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
      await withdrawFunds(withdrawAmount, withdrawAddress);
    }
  };

  const handleWithdrawOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(e.target.value);
    setWithdrawAddress(walletDetails?.address || '');
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

  const maskname = (name: string | undefined) => {
    if (!name) return '';
    const nameArray = name.split(' ');
    return `${nameArray[0]} ${nameArray[1].charAt(0)}.`;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%', marginRight: '2%' }}>
          <Card title="Profile" description="Here is your VeriFi Profile, add more reviews comments to boost your reputation and score! The higher the score the more Vault Tokens you have.">
            <div>
              {isConnected ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <User style={{ marginRight: '5px' }} />
                    <p><strong>Name:</strong> {maskname(userInfo?.name)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <Mail style={{ marginRight: '5px' }} />
                    <p><strong>Email:</strong> {userInfo?.email || "profileemail@gmail.com"}</p>
                  </div>
                  <img src={userInfo?.profileImage} alt="Profile" width={100} style={{ marginBottom: '10px' }} />
                </div>
              ) : (
                <p>Loading user info...</p>
              )}
            </div>
          </Card>
        </div>
        <div style={{ width: '48%', marginLeft: '2%' }}>
          <Card title="Wallet" description="Deposit and Withdraw funds">
            <div>
              {isConnected ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <Wallet style={{ marginRight: '5px' }} />
                    <p><strong>Wallet Address:</strong> {walletDetails?.address || "0x71a7a28488E39717c0ECcAEF15Ed62A47A55C44d"}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <DollarSign style={{ marginRight: '5px' }} />
                    <p><strong>Vault Balance:</strong> {walletDetails?.balance} USDC</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <CreditCard style={{ marginRight: '5px' }} />
                    <p><strong>Token Balance:</strong> {walletDetails?.balance} VV</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <Percent style={{ marginRight: '5px' }} />
                    <p><strong>Share:</strong> {walletDetails?.balance}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '10px' }}>
                    <DollarSign style={{ marginRight: '5px' }} />
                    <p><strong>USDC Balance:</strong> {walletDetails?.balance} USDC</p>
                  </div>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={handleWithdrawOnChange}
                    placeholder="Amount to withdraw"
                    style={{ marginRight: '10px', padding: '5px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', color: 'black', marginBottom: '10px' }}
                  />
                  <button onClick={handleWithdraw} style={{ padding: '5px 10px', fontSize: '16px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}>
                    Withdraw
                  </button>
                </div>
              ) : (
                <p>Loading wallet info...</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileMe;