import React from 'react';

const AdBlockerWarning = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="alert alert-warning" style={{ margin: '20px' }}>
      <h4>Ad Blocker Detected</h4>
      <p>It looks like your ad blocker is preventing the app from making necessary API requests.</p>
      <p>Please <a href="/adblocker-help.html" target="_blank" rel="noopener noreferrer">click here</a> for instructions on how to fix this issue.</p>
    </div>
  );
};

export default AdBlockerWarning;
