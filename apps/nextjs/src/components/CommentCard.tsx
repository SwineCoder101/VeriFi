// components/CommentCard.tsx
import React from 'react';

interface CommentCardProps {
  comment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
      <p>{comment}</p>
    </div>
  );
};

export default CommentCard;