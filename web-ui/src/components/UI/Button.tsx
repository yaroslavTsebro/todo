import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
