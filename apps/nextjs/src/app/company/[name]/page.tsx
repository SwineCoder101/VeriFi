"use client";

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OverviewCard from '../../../components/OverviewCard';
import ReviewModal, { ReviewFormData } from '../../../components/ReviewModal';
import ReviewCard, { ReviewCardData } from '../../../components/ReviewCard';
import globalStyle from '../../global.module.css';
import Card from '@/components/Card';
import useWeb3Auth from '@/hooks/useWeb3Auth';
import { useAuth } from '@/context/Web3AuthContext';
import { useSignAttestation } from '@/hooks/useSignAttestation';

const CompanyProfile = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const {signClient, walletDetails} = useAuth();
  const {createAttestation, getAttestation} = useSignAttestation();

  const name = params.name;
  const ratings = searchParams.get('ratings');
  const views = searchParams.get('views');
  const headquarters = searchParams.get('headquarters');
  const description = searchParams.get('description') || 'No description available.';
  const comments = JSON.parse(searchParams.get('comments') ?? '[]');
  const website = searchParams.get('website');
  const employees = searchParams.get('employees');
  const sector = searchParams.get('sector');
  const revenue = searchParams.get('revenue');
  const competitors = searchParams.get('competitors');
  const locations = searchParams.get('locations');
  const foundingDate = searchParams.get('foundingDate');
  const investments = searchParams.get('investments');

  const [companyData, setCompanyData] = useState({
    name: '',
    ratings: 0,
    views: 0,
    headquarters: '',
    description: '',
    comments: [] as string[],
    website: '',
    employees: '',
    sector: '',
    revenue: '',
    competitors: '',
    locations: '',
    foundingDate: '',
    investments: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewCardData[]>([]);

  useEffect(() => {
    const newCompanyData = {
      name: name as string,
      ratings: Number(ratings),
      views: Number(views),
      headquarters: headquarters as string,
      description: description as string,
      comments: comments as string[],
      website: website as string,
      employees: employees as string,
      sector: sector as string,
      revenue: revenue as string,
      competitors: competitors as string,
      locations: locations as string,
      foundingDate: foundingDate as string,
      investments: investments as string,
    };

    // Only update state if the new data is different from the current state
    if (JSON.stringify(newCompanyData) !== JSON.stringify(companyData)) {
      setCompanyData(newCompanyData);
    }
  }, [name, ratings, views, headquarters, description, comments, website, employees, sector, revenue, competitors, locations, foundingDate, investments, companyData]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = (formData: ReviewFormData) => {
    const newReview: ReviewCardData = {
      walletAddress: walletDetails?.address || '', // Replace with actual wallet address if available
      review: formData,
      timestamp: new Date().toISOString(),
    };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setIsModalOpen(false);
  };

  return (
    <div className={globalStyle.container}>
      <OverviewCard companyData={companyData} />
      {isModalOpen && <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleReviewSubmit} createAttestation={createAttestation} />}
      <div>
        <Card title={'Reviews'} description={''}>
          <button onClick={handleOpenModal} style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: '#fff', margin: '20px 0' }}>
            Add Review
          </button>
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;