import React, { useState, useEffect, useRef } from 'react';
import styles from './ReviewModal.module.css';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ReviewFormData) => void;
}

interface ReviewFormData {
  companyName: string;
  location: string;
  department: string;
  industry: string;
  cultureRating: number;
  motivationRating: number;
  salaryRating: number;
  pros: string;
  cons: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    companyName: '',
    location: '',
    department: '',
    industry: '',
    cultureRating: 0,
    motivationRating: 0,
    salaryRating: 0,
    pros: '',
    cons: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        <h1>Post a Company Review</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="industry">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="cultureRating">Company Culture Rating (out of 10)</label>
            <input
              type="number"
              id="cultureRating"
              name="cultureRating"
              value={formData.cultureRating}
              onChange={handleChange}
              min="0"
              max="5"
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="motivationRating">Motivation Rating (out of 10)</label>
            <input
              type="number"
              id="motivationRating"
              name="motivationRating"
              value={formData.motivationRating}
              onChange={handleChange}
              min="0"
              max="5"
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="salaryRating">Salary Rating (out of 10)</label>
            <input
              type="number"
              id="salaryRating"
              name="salaryRating"
              value={formData.salaryRating}
              onChange={handleChange}
              min="0"
              max="5"
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="pros">Pros</label>
            <textarea
              id="pros"
              name="pros"
              value={formData.pros}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="cons">Cons</label>
            <textarea
              id="cons"
              name="cons"
              value={formData.cons}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;