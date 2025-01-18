import React, { useState } from 'react';
import TextInput from '../../UI/TextInput';
import Button from '../../UI/Button';

interface CreateTaskListFormProps {
  onSubmit: (name: string) => void;
}

const CreateTaskListForm: React.FC<CreateTaskListFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(name);
    }
  };

  return (
    <div>
      <TextInput
        id="task-list-name"
        label="Task List Name"
        type="text"
        validations={[
          { validator: (value) => value.trim() !== '', message: 'Name is required.' },
          { validator: (value) => value.length >= 3, message: 'Name must be at least 3 characters long.' },
        ]}
        onValidChange={(value, valid) => {
          setName(value);
          setIsValid(valid);
        }}
      />
      <div className="flex justify-end mt-4">
        <Button
          text="Create"
          onClick={handleSubmit}
          className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
        />
      </div>
    </div>
  );
};

export default CreateTaskListForm;