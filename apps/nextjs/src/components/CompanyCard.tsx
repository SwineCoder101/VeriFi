import React from 'react';
import Link from 'next/link';
import styles from './CompanyCard.module.css';
import Card from './Card';

interface CompanyCardProps {
  name: string;
  icon: string;
  location: string;
  size: string;
  industry: string;
  reviews: number;
  salaries: number;
  jobs: number;
  rating: number;
  lastPro: string;
  lastCon: string;
  companyId: string; // Assuming you have a companyId to uniquely identify the company
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  icon,
  location,
  size,
  industry,
  reviews,
  salaries,
  jobs,
  rating,
  lastPro,
  lastCon,
  companyId,
}) => {
  return (
    <Link href={`/company/${companyId}`}>
        <Card title={name} description={``}>
          <div className={styles.cardContent}>
            <img src={icon} alt={`${name} logo`} className={styles.icon} />
            <div className={styles.details}>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.location}>{location}</p>
              <p className={styles.size}>{size}</p>
              <p className={styles.industry}>{industry}</p>
              <div className={styles.stats}>
                <p>{reviews} Reviews</p>
                <p>{salaries} Salaries</p>
                <p>{jobs} Jobs</p>
              </div>
              <div className={styles.proCon}>
                <p className={styles.pro}><strong>Pro:</strong> {lastPro}</p>
                <p className={styles.con}><strong>Con:</strong> {lastCon}</p>
              </div>
            </div>
            <div className={styles.rating}>
              <span>Rating: {rating}</span>
            </div>
          </div>
        </Card>
    </Link>
  );
};

export default CompanyCard;