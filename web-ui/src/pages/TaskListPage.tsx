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
} from '../openapi';
import EditTaskForm from '../components/pages/task/EditTaskForm';
import CreateTaskForm from '../components/pages/task/CreateTaskForm';
import Pagination from '../components/UI/Pagination';
import TaskCard from '../components/UI/TaskCardю';


const TaskListPage: React.FC = () => {
  const { taskListId } = useParams<{ taskListId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [participants, setParticipants] = useState<UserTaskList[]>([]);
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
      setParticipantsPagination((prev) => ({
        ...prev,
        total: Math.ceil(data.total / participantsPagination.limit),
      }));
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    }
  };

  const openEditTaskDialog = (task: Task) => {
    const handleSubmit = async (updatedTitle: string, updatedDescription: string, updatedStatus: string) => {
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

  return (
    <div className="flex">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-lg font-bold mb-4">Participants</h2>
        <ul className="space-y-2">
          {participants.map((participant) => (
            <li key={participant.id} className="text-sm text-gray-700">
              {participant.user.email}
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

      <div className="w-3/4 p-4">
        <h2 className="text-lg font-bold mb-2">Tasks</h2>
        <Button
          text="Create Task"
          onClick={openCreateTaskDialog}
          className="bg-green-500 hover:bg-green-600 mb-4"
        />
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onEdit={() => openEditTaskDialog(task)}
                onDelete={() => deleteTask(task.id)}
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
