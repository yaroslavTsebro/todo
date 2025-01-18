import React from 'react';
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  const classes = twMerge(`w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition ${className ?? ""}`);
  return (
    <button
      onClick={onClick}
      className={classes}
    >
      {text}
    </button>
  );
};

export default Button;
