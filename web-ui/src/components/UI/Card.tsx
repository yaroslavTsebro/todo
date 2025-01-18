import React from 'react';

interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      {children}
    </div>
  );
};

export default Card;
