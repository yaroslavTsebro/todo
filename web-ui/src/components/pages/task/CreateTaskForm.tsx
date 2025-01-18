import React, { useState } from 'react';
import Button from '../../UI/Button';
import TextInput from '../../UI/TextInput';


interface CreateTaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    onSubmit(title, description);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Create Task</h2>
      <TextInput
        id="title"
        label="Title"
        type="text"
        validations={[{ validator: (value) => value.length > 0, message: 'Title is required' }]}
        onValidChange={(value) => setTitle(value)}
      />
      <TextInput
        id="description"
        label="Description"
        type="text"
        validations={[]}
        onValidChange={(value) => setDescription(value)}
      />
      <Button text="Create Task" onClick={handleSubmit} className="mt-4 bg-green-500 hover:bg-green-600" />
    </div>
  );
};

export default CreateTaskForm;
