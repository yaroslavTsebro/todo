import React, { useState } from 'react';
import { UpdateTaskDtoStatusEnum } from '../../../openapi';
import Button from '../../UI/Button';
import Dropdown from '../../UI/Dropdown';
import TextInput from '../../UI/TextInput';

interface EditTaskFormProps {
  initialTitle: string;
  initialDescription: string | null;
  initialStatus: string;
  onSubmit: (title: string, description: string, status: string) => void;
  onCancel?: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  initialTitle,
  initialDescription,
  initialStatus,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || '');
  const [status, setStatus] = useState(initialStatus);


  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Edit Task</h2>
      <TextInput
        id="title"
        label="Title"
        type="text"
        validations={[{ validator: (value) => value.length > 0, message: 'Title is required' }]}
        onValidChange={(value) => setTitle(value)}
        value={title}
      />
      <TextInput
        id="description"
        label="Description"
        type="text"
        validations={[]}
        onValidChange={(value) => setDescription(value)}
        value={description}
      />
      <Dropdown
        id="status"
        label="Status"
        optionsEnum={UpdateTaskDtoStatusEnum}
        selected={status} 
        onChange={(value) => setStatus(value)}
      />
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          text="Save"
          onClick={() => onSubmit(title, description, status)}
          className="bg-blue-500 hover:bg-blue-600"
        />
        {onCancel && (
          <Button
            text="Close"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600"
          />
        )}
      </div>
    </div>
  );
};

export default EditTaskForm;
