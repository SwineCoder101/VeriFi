import React from 'react';
import styles from './OverviewCard.module.css';
import Card from './Card';
import { Building2, Calendar, DollarSign, Globe, MapPin, Users, Eye, Star, Briefcase, PieChart, Landmark, Target } from "lucide-react";

interface OverviewCardProps {
  companyData: {
    name: string;
    ratings: number;
    views: number;
    headquarters: string;
    description: string;
    website: string;
    employees: string;
    sector: string;
    revenue: string;
    competitors: string;
    locations: string;
    foundingDate: string;
    investments: string;
  };
}

const OverviewCard: React.FC<OverviewCardProps> = ({ companyData }) => {
  return (
    <div className={styles.cardContainer}>
      <Card title={`Overview: ${companyData.name}`} description={companyData.description}>
        <div className={styles.cardContent}>
          <div className={styles.column}>
            <p><Star className={styles.icon} /><strong>Ratings:</strong> {companyData.ratings}</p>
            <p><Eye className={styles.icon} /><strong>Views:</strong> {companyData.views}</p>
            <p><MapPin className={styles.icon} /><strong>Headquarters:</strong> {companyData.headquarters}</p>
            <p><Globe className={styles.icon} /><strong>Website:</strong> <a href={companyData.website} target="_blank" rel="noopener noreferrer">{companyData.website}</a></p>
          </div>
          <div className={styles.column}>
            <p><Users className={styles.icon} /><strong>Employees:</strong> {companyData.employees}</p>
            <p><Briefcase className={styles.icon} /><strong>Sector:</strong> {companyData.sector}</p>
            <p><DollarSign className={styles.icon} /><strong>Revenue:</strong> {companyData.revenue}</p>
            <p><Target className={styles.icon} /><strong>Competitors:</strong> {companyData.competitors}</p>
          </div>
          <div className={styles.column}>
            <p><Building2 className={styles.icon} /><strong>Locations:</strong> {companyData.locations}</p>
            <p><Calendar className={styles.icon} /><strong>Founding Date:</strong> {companyData.foundingDate}</p>
            <p><PieChart className={styles.icon} /><strong>Investments:</strong> {companyData.investments}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewCard;