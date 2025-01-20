import React from 'react';
import Button from '../UI/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        text="Previous"
        onClick={() => {
          if (currentPage > 1) onPrevious();
        }}
        className={`w-auto ${
          currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      />
      {totalPages > 0 && (
        <span className="text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>
      )}
      <Button
        text="Next"
        onClick={() => {
          if (currentPage < totalPages) onNext();
        }}
        className={`w-auto ${
          currentPage === totalPages || totalPages === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      />
    </div>
  );
};

export default Pagination;
