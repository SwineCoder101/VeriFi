import React, { useState } from 'react';
import Card from './Card';
import { ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react';
import { ReviewFormData } from './ReviewModal';

export interface ReviewCardData {
  walletAddress: string;
  timestamp: string;
  review: ReviewFormData;
}

const ReviewCard: React.FC<ReviewCardData> = (reviewCardData: ReviewCardData) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const { review, walletAddress, timestamp } = reviewCardData;

  const handleThumbsUp = () => {
    setLikes(likes + 1);
  };

  const handleThumbsDown = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <Card title={`From: ${walletAddress} at ${timestamp}`} description={''} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <p><strong>Location:</strong> {review.location}</p>
          <p><strong>Department:</strong> {review.department}</p>
          <p><strong>Culture Rating:</strong> {review.cultureRating}/10</p>
          <p><strong>Motivation Rating:</strong> {review.motivationRating}/10</p>
          <p><strong>Salary Rating:</strong> {review.salaryRating}/10</p>
        </div>
        <div style={{ flex: 1 }}>
          <p><strong>Pros:</strong></p>
          <p style={{ color: 'green' }}><CheckCircle style={{ marginRight: '5px' }} /> {review.pros}</p>
          <p><strong>Cons:</strong></p>
          <p style={{ color: 'red' }}><XCircle style={{ marginRight: '5px' }} /> {review.cons}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={handleThumbsUp} style={{ display: 'flex', alignItems: 'center', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ThumbsUp style={{ marginRight: '5px' }} /> {likes}
        </button>
        <button onClick={handleThumbsDown} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ThumbsDown style={{ marginRight: '5px' }} /> {dislikes}
        </button>
      </div>
    </Card>
  );
};

export default ReviewCard;