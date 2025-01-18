import React from 'react';
import useInput from '../../hooks/useInput';

interface TextInputWithValidationProps {
  id: string;
  label: string;
  type: string;
  validations: {
    validator: (value: string) => boolean;
    message: string;
  }[];
  onValidChange?: (value: string, isValid: boolean) => void;
  value?: string;
}

const TextInput: React.FC<TextInputWithValidationProps> = ({
  id,
  label,
  type,
  validations,
  onValidChange,
  value: initialValue = '',
}) => {
  const [
    value,
    isValid,
    isTouched,
    validationResults,
    handleChange,
    handleBlur,
  ] = useInput(validations.map((v) => v.validator), initialValue);

  const previousValue = React.useRef<string>(value);
  const previousIsValid = React.useRef<boolean>(isValid);

  React.useEffect(() => {
    if (
      onValidChange &&
      (value !== previousValue.current || isValid !== previousIsValid.current)
    ) {
      onValidChange(value, isValid);
      previousValue.current = value;
      previousIsValid.current = isValid;
    }
  }, [value, isValid, onValidChange]);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`mt-1 block w-full px-3 py-2 border ${
          !isValid && isTouched ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {isTouched &&
        validations.map(
          (validation, index) =>
            !validationResults[index] && (
              <p key={index} className="text-red-500 text-sm">
                {validation.message}
              </p>
            )
        )}
    </div>
  );
};

export default TextInput;
