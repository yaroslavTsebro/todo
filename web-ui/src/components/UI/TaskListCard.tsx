import React from 'react';
import Card from './Card';
import { UserTaskList, UserTaskListRoleEnum } from '../../openapi';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface TaskListCardProps {
  userTaskList: UserTaskList;
  onUpdate: () => void;
  onInvite: () => void;
}

const TaskListCard: React.FC<TaskListCardProps> = ({ userTaskList, onUpdate, onInvite }) => {
  const navigate = useNavigate();
  
  const canEdit =
    userTaskList.role === UserTaskListRoleEnum.Admin || userTaskList.role === UserTaskListRoleEnum.Owner;
  const taskList = userTaskList.taskList;

  return (
    <Card>
      <h2 className="text-lg font-bold mb-2">{taskList.name}</h2>
      <div className="text-sm text-gray-500 mb-4 min-h-[1rem]">
        {taskList.description || <span>&nbsp;</span>}
      </div>

      {canEdit && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Button
            text="Update"
            onClick={onUpdate}
            className="bg-blue-500 hover:bg-blue-600"
          />
          <Button
            text="Invite User"
            onClick={onInvite}
            className="bg-green-500 hover:bg-green-600"
          />
          <Button
            text="Details"
            onClick={() => navigate(`/project/${taskList.id}`)}
            className="bg-yellow-500 hover:bg-yellow-600"
          />
        </div>
      )}
    </Card>
  );
};

export default TaskListCard;

