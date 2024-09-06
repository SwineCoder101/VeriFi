// components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p>{description}</p>
      <div>{children}</div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#343a40', // dark mode: #343a40
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2em', // Double the font size
  },
};

export default Card;