import { taskApi, taskListApi } from '../api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/UI/Button';
import Dialog from '../components/UI/Dialog';
import {
  Task,
  UserTaskList,
  TaskControllerGetAllRequest,
  TaskPaginationResult,
  UserTaskListPaginationResult,
  UpdateTaskDtoStatusEnum,
  TaskControllerCreateRequest,
  TaskControllerUpdateRequest,
  UserTaskListRoleEnum,
  TaskControllerChangeStatusRequest,
} from '../openapi';
import EditTaskForm from '../components/pages/task/EditTaskForm';
import CreateTaskForm from '../components/pages/task/CreateTaskForm';
import Pagination from '../components/UI/Pagination';
import TaskCard from '../components/UI/TaskCard';
import ChangeStatusTaskForm from '../components/pages/task/ChangeStatusTaskForm';

const TaskListPage: React.FC = () => {
  const { taskListId } = useParams<{ taskListId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [participants, setParticipants] = useState<UserTaskList[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 1 });
  const [participantsPagination, setParticipantsPagination] = useState({
    page: 1,
    limit: 5,
    total: 1,
  });

  useEffect(() => {
    fetchTasks();
    fetchParticipants();
    getCurrentRole();
  }, [pagination.page, participantsPagination.page]);

  const fetchTasks = async () => {
    const request: TaskControllerGetAllRequest = {
      taskListId: taskListId!,
      field: 'createdAt',
      order: 'asc',
      page: pagination.page,
      limit: pagination.limit,
    };

    try {
      const response = await taskApi.taskControllerGetAll(request);
      const data = response as TaskPaginationResult;
      setTasks(data.data);
      setPagination((prev) => ({
        ...prev,
        total: Math.ceil(data.total / pagination.limit),
      }));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await taskListApi.taskListControllerGetAllParticipants({
        taskListId: taskListId!,
        page: participantsPagination.page,
        limit: participantsPagination.limit,
      });
      const data = response as UserTaskListPaginationResult;
      setParticipants(data.data);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    }
  };

  const getCurrentRole = async () => {
    try {
      const response = await taskListApi.taskListControllerGetMyUserTaskList({
        taskListId: taskListId!,
      });
      const data = response as UserTaskList;
      setCurrentUserRole(data.role);
    } catch (error) {
      console.error('Failed to fetch role:', error);
    }
  };

  const openEditTaskDialog = (task: Task) => {
    const handleSubmit = async (
      updatedTitle: string,
      updatedDescription: string,
      updatedStatus: string
    ) => {
      const request: TaskControllerUpdateRequest = {
        id: task.id,
        taskListId: taskListId!,
        updateTaskDto: {
          title: updatedTitle,
          description: updatedDescription,
          status: updatedStatus as UpdateTaskDtoStatusEnum,
        },
      };

      try {
        await taskApi.taskControllerUpdate(request);
        setDialogOpen(false);
        fetchTasks();
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    };

    setDialogContent(
      <EditTaskForm
        initialTitle={task.title}
        initialDescription={task.description}
        initialStatus={task.status}
        onSubmit={handleSubmit}
        onCancel={() => setDialogOpen(false)}
      />
    );
    setDialogOpen(true);
  };

  const openCreateTaskDialog = () => {
    const handleSubmit = async (title: string, description: string) => {
      try {
        const request: TaskControllerCreateRequest = {
          taskListId: taskListId!,
          createTaskDto: { title, description },
        };
        await taskApi.taskControllerCreate(request);
        setDialogOpen(false);
        fetchTasks();
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    };

    setDialogContent(<CreateTaskForm onSubmit={handleSubmit} />);
    setDialogOpen(true);
  };

  const deleteTask = async (taskId: number) => {
    try {
      await taskApi.taskControllerDelete({ id: taskId, taskListId: taskListId! });
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const openChangeStatusTaskDialog = (task: Task) => {
    const handleSubmit = async (updatedStatus: string) => {
      const request: TaskControllerChangeStatusRequest = {
        id: task.id,
        taskListId: taskListId!,
        changeStatusDto: {
          status: updatedStatus as UpdateTaskDtoStatusEnum,
        },
      };

      try {
        await taskApi.taskControllerChangeStatus(request);
        setDialogOpen(false);
        fetchTasks();
      } catch (error) {
        console.error('Failed to change task status:', error);
      }
    };

    setDialogContent(
      <ChangeStatusTaskForm
        initialStatus={task.status}
        onSubmit={handleSubmit}
        onCancel={() => setDialogOpen(false)}
      />
    );
    setDialogOpen(true);
  };

  const canPerformAction = (roles: string[]) => {
    if (roles.length === 0) return true;
    return (currentUserRole && roles.includes(currentUserRole)) || false;
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 w-full border-b lg:border-b-0 lg:border-r p-4">
        <h2 className="text-lg font-bold mb-4">Participants</h2>
        <ul className="space-y-2">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="text-sm text-gray-700 flex justify-between items-center"
            >
              <span>{participant.user.email}</span>
              {canPerformAction([UserTaskListRoleEnum.Owner]) &&
                participant.role !== UserTaskListRoleEnum.Owner && (
                  <Button
                    text="Remove"
                    onClick={() => console.log('Remove user', participant.id)}
                    className="bg-red-500 hover:bg-red-600 w-20"
                  />
                )}
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={participantsPagination.page}
          totalPages={participantsPagination.total}
          onPrevious={() =>
            setParticipantsPagination((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
          onNext={() =>
            setParticipantsPagination((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
        />
      </div>

      <div className="lg:w-3/4 w-full p-4">
        <h2 className="text-lg font-bold mb-2">Tasks</h2>
        {canPerformAction([UserTaskListRoleEnum.Admin, UserTaskListRoleEnum.Owner]) && (
          <Button
            text="Create Task"
            onClick={openCreateTaskDialog}
            className="bg-green-500 hover:bg-green-600 mb-4"
          />
        )}
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onEdit={
                  canPerformAction([UserTaskListRoleEnum.Admin, UserTaskListRoleEnum.Owner])
                    ? () => openEditTaskDialog(task)
                    : undefined
                }
                onDelete={
                  canPerformAction([UserTaskListRoleEnum.Admin, UserTaskListRoleEnum.Owner])
                    ? () => deleteTask(task.id)
                    : undefined
                }
                onStatusChange={
                  canPerformAction([])
                    ? () => openChangeStatusTaskDialog(task)
                    : undefined
                }
              />
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.total}
          onPrevious={() =>
            setPagination((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
          onNext={() =>
            setPagination((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
        />
      </div>

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
        {dialogContent}
      </Dialog>
    </div>
  );
};

export default TaskListPage;
