import React, { useState } from 'react';
import { UpdateTaskDtoStatusEnum } from '../../../openapi';
import Button from '../../UI/Button';
import Dropdown from '../../UI/Dropdown';

interface ChangeStatusTaskFormProps {
  initialStatus: string;
  onSubmit: (status: string) => void;
  onCancel?: () => void;
}

const ChangeStatusTaskForm: React.FC<ChangeStatusTaskFormProps> = ({
  initialStatus,
  onSubmit,
  onCancel,
}) => {
  const [status, setStatus] = useState(initialStatus);


  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Edit Task</h2>
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
          onClick={() => onSubmit(status)}
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

export default ChangeStatusTaskForm;
