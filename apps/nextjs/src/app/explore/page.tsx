"use client";

import React, { useState } from 'react';
import CompanyCard from '../../components/CompanyCard';
import ReviewModal from '../../components/ReviewModal';
import styles from './ExplorePage.module.css';

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example data (replace with actual data fetching logic)
  const companies = [
    {
      companyId: '1',
      name: 'Company A',
      icon: 'https://via.placeholder.com/50',
      location: 'City A',
      size: '500-1000 employees',
      industry: 'Tech',
      reviews: 120,
      salaries: 80,
      jobs: 15,
      rating: 4.5,
      lastPro: 'Great work-life balance',
      lastCon: 'Limited career growth',
    },
    {
      companyId: '2',
      name: 'Company B',
      icon: 'https://via.placeholder.com/50',
      location: 'City B',
      size: '100-500 employees',
      industry: 'Finance',
      reviews: 90,
      salaries: 60,
      jobs: 10,
      rating: 3.8,
      lastPro: 'Good salary',
      lastCon: 'High pressure environment',
    },
    {
      companyId: '3',
      name: 'Company C',
      icon: 'https://via.placeholder.com/50',
      location: 'City C',
      size: '1000-5000 employees',
      industry: 'Healthcare',
      reviews: 150,
      salaries: 100,
      jobs: 20,
      rating: 4.2,
      lastPro: 'Supportive management',
      lastCon: 'Long working hours',
    },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePostReview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReview = (formData: any) => {
    // Logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.explorepage}>
      <h1>Explore Companies</h1>
      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchbar}
      />
      <button
        onClick={handlePostReview}
        className={styles.postReviewButton}
      >
        Post a Company Review
      </button>
      <div className={styles.companylist}>
        {filteredCompanies.map((company, index) => (
          <div key={index}>
            <CompanyCard
              companyId={company.companyId}
              name={company.name}
              icon={company.icon}
              location={company.location}
              size={company.size}
              industry={company.industry}
              reviews={company.reviews}
              salaries={company.salaries}
              jobs={company.jobs}
              rating={company.rating}
              lastPro={company.lastPro}
              lastCon={company.lastCon}
            />
          </div>
        ))}
      </div>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
};

export default ExplorePage;