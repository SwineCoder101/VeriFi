"use client";

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommentCard from '../../../components/CommentCard'; // Import CommentCard component
import globalStyle from '../../globals.module.css'; // Import global styles

const CompanyProfile = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const name = params.name;
  const ratings = searchParams.get('ratings');
  const views = searchParams.get('views');
  const headquarters = searchParams.get('headquarters');
  const description = searchParams.get('description') || 'No description available.';
  const comments = JSON.parse(searchParams.get('comments') ?? '[]');

  const [companyData, setCompanyData] = useState({
    name: '',
    ratings: 0,
    views: 0,
    headquarters: '',
    description: '',
    comments: [] as string[],
  });

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const newCompanyData = {
      name: name as string,
      ratings: Number(ratings),
      views: Number(views),
      headquarters: headquarters as string,
      description: description as string,
      comments: comments as string[],
    };

    // Only update state if the new data is different from the current state
    if (JSON.stringify(newCompanyData) !== JSON.stringify(companyData)) {
      setCompanyData(newCompanyData);
    }
  }, [name, ratings, views, headquarters, description, comments, companyData]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      setCompanyData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, newComment],
      }));
      setNewComment('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Company Profile: {companyData.name}</h1>
      <div>
        <p><strong>Ratings:</strong> {companyData.ratings}</p>
        <p><strong>Views:</strong> {companyData.views}</p>
        <p><strong>Headquarters:</strong> {companyData.headquarters}</p>
        <p><strong>Description:</strong> {companyData.description}</p>
      </div>
      <div>
        <h2>Comments</h2>
        {companyData.comments.length > 0 ? (
          <div>
            {companyData.comments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <p>No comments available.</p>
        )}
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Enter your comment"
          />
          <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;