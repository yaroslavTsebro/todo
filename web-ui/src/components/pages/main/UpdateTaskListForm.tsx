import React, { useState } from 'react';
import Button from '../../UI/Button';
import TextInput from '../../UI/TextInput';

interface UpdateTaskListFormProps {
  id: string;
  onSubmit: (name: string, description: string) => Promise<void>;
}

const UpdateTaskListForm: React.FC<UpdateTaskListFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(name, description);
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Update TaskList</h2>
      <TextInput
        id="name"
        label="TaskList Name"
        type="text"
        validations={[{ validator: (value) => value.length > 0, message: 'Name is required' }]}
        onValidChange={(value) => setName(value)}
      />
      <TextInput
        id="description"
        label="TaskList Description"
        type="text"
        validations={[]}
        onValidChange={(value) => setDescription(value)}
      />
      <Button text="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default UpdateTaskListForm;
