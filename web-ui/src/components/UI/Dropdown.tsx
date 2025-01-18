import React from 'react';

interface DropdownProps {
  id: string;
  label: string;
  optionsEnum: Record<string, string>;
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ id, label, optionsEnum, selected, onChange }) => {

  const options = Object.entries(optionsEnum).map(([key, value]) => ({
    value,
    label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
  }));

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={id}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
