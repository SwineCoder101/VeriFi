import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CompanyCard.module.css'; // Import CSS module

interface CompanyCardProps {
  name: string;
  ratings: number;
  views: number;
  headquarters: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, ratings, views, headquarters }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/company/${name}?ratings=${ratings}&views=${views}&headquarters=${headquarters}`);
  };

  return (
    <div className={styles.companyCard} onClick={handleClick}>
      <div className={styles.companyCardContent}>
        <h2 className={styles.companyName}>{name}</h2>
        <div className={styles.companyDetails}>
          <p><strong>Ratings:</strong> {ratings}</p>
          <p><strong>Views:</strong> {views}</p>
          <p><strong>Headquarters:</strong> {headquarters}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;