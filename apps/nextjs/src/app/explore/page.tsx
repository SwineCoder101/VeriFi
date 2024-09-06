"use client";

import React, { useState } from 'react';
import CompanyCard from '../../components/CompanyCard';
import styles from './ExplorePage.module.css';

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Example data (replace with actual data fetching logic)
  const companies = [
    {
      name: 'Company A',
      ratings: 4.5,
      views: 1000,
      headquarters: 'City A',
    },
    {
      name: 'Company B',
      ratings: 3.8,
      views: 800,
      headquarters: 'City B',
    },
    {
      name: 'Company C',
      ratings: 4.2,
      views: 1200,
      headquarters: 'City C',
    },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
      <div className={styles.companylist}>
        {filteredCompanies.map((company, index) => (
          <div key={index} className={styles.companycard}>
            <CompanyCard
              name={company.name}
              ratings={company.ratings}
              views={company.views}
              headquarters={company.headquarters}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;