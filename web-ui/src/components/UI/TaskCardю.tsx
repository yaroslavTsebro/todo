import React from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Task } from '../../openapi';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md font-semibold">{task.title}</h3>
        <div className="flex flex-col space-y-2">
          <Button
            text="Edit"
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-sm"
          />
          <Button
            text="Delete"
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-sm"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600">{task.description || 'No description available.'}</p>
      <p
        className={`text-sm mt-2 ${
          task.status === 'DONE' ? 'text-green-600' : 'text-yellow-600'
        }`}
      >
        {task.status === 'DONE' ? 'Completed' : 'Not Completed'}
      </p>
    </Card>
  );
};

export default TaskCard;
