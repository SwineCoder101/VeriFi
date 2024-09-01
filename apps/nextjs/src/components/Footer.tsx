import React, { CSSProperties } from 'react';

const Footer = () => {
  const footerStyle: CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    borderTop: '1px solid #dee2e6',
    textAlign: 'center',
    fontSize: '14px',
    color: '#6c757d',
  };

  return (
    <footer style={footerStyle}>
      <p>© 2024 VerFi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;