import React, { useEffect, useState } from 'react';
import { taskListApi } from '../api';
import TaskListCard from '../components/UI/TaskListCard';
import {
  TaskListControllerGetAllRequest,
  TaskListControllerCreateRequest,
  UserTaskList,
  TaskListControllerInviteUserRequest,
  TaskListControllerUpdateRequest,
  InviteUserDtoRoleEnum,
} from '../openapi';
import Dialog from '../components/UI/Dialog';
import Button from '../components/UI/Button';
import InviteUserForm from '../components/pages/main/InviteUserForm';
import UpdateTaskListForm from '../components/pages/main/UpdateTaskListForm';
import { useNavigate } from 'react-router-dom';
import CreateTaskListForm from '../components/pages/task-list/CreateTaskListForm';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [taskLists, setTaskLists] = useState<UserTaskList[]>([]);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTaskLists();
  }, [pagination.page]);

  const fetchTaskLists = async () => {
    const request: TaskListControllerGetAllRequest = {
      page: pagination.page,
      limit: pagination.limit,
    };

    try {
      const response = await taskListApi.taskListControllerGetAll(request);

      setTaskLists(response.data);
      setTotalPages(Math.ceil(response.total / pagination.limit));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      navigate('/signup');
    }
  };

  const handleCreateTaskList = () => {
    const handleSubmit = async (name: string) => {
      try {
        const request: TaskListControllerCreateRequest = {
          createTaskListDto: { name },
        };
        await taskListApi.taskListControllerCreate(request);
        setDialogOpen(false);
        fetchTaskLists();
      } catch (error) {
        console.error('Failed to create task list:', error);
      }
    };

    setDialogContent(
      <div>
        <h2 className="text-lg font-bold mb-4">Create Task List</h2>
        <CreateTaskListForm onSubmit={handleSubmit} />
      </div>
    );
    setDialogOpen(true);
  };

  const handleUpdateTaskList = (taskListId: string) => {
    const handleSubmit = async (name: string, description: string) => {
      const request: TaskListControllerUpdateRequest = {
        taskListId,
        updateProjectDto: { name, description },
      };

      try {
        await taskListApi.taskListControllerUpdate(request);
        setDialogOpen(false);
        fetchTaskLists();
      } catch (error) {
        console.error('Failed to update task list:', error);
      }
    };

    setDialogContent(
      <UpdateTaskListForm id={taskListId} onSubmit={handleSubmit} />
    );
    setDialogOpen(true);
  };

  const handleInviteUser = (taskListId: string) => {
    const handleSubmit = async (email: string, role: InviteUserDtoRoleEnum) => {
      const request: TaskListControllerInviteUserRequest = {
        taskListId,
        inviteUserDto: { email, role },
      };

      try {
        await taskListApi.taskListControllerInviteUser(request);
        setDialogOpen(false);
        fetchTaskLists();
      } catch (error) {
        console.error('Failed to invite user:', error);
      }
    };

    setDialogContent(
      <InviteUserForm onSubmit={handleSubmit} />
    );
    setDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <Button text="Create TaskList" onClick={handleCreateTaskList} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskLists.map((userTaskList) => (
          <TaskListCard
            key={userTaskList.taskList.id}
            userTaskList={userTaskList}
            onUpdate={() => handleUpdateTaskList(userTaskList.taskList.id)}
            onInvite={() => handleInviteUser(userTaskList.taskList.id)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          text="Previous"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
          className="w-auto max-w-[200px]"
        />
        <span>
          {pagination.page}/{totalPages}
        </span>
        <Button
          text="Next"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
          className="w-auto max-w-[200px]"
        />
      </div>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        {dialogContent}
      </Dialog>
    </div>
  );
};

export default MainPage;
