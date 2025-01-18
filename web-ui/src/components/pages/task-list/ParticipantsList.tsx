import React from 'react';
import { UserTaskList } from '../../../openapi';
import Button from '../../UI/Button';
import Pagination from '../../UI/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../../storage';


interface ParticipantsListProps {
  participants: UserTaskList[];
  pagination: { page: number; total: number };
  onPreviousPage: () => void;
  onNextPage: () => void;
  onDeleteParticipant: (participantId: number) => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  pagination,
  onPreviousPage,
  onNextPage,
  onDeleteParticipant,
}) => {

  const { email } = useSelector((state: RootState) => state.user);
  
  return (
    <div className="w-1/4 border-r p-4">
      <h2 className="text-lg font-bold mb-4">Participants</h2>
      <ul className="space-y-2">
        {participants.map((participant) => (
          <li
            key={participant.id}
            className="text-sm text-gray-700 flex items-center justify-between"
          >
            <span>{participant.user.email}</span>
            { participant.user.email !== email! && (
              <Button
                text="Delete"
                onClick={() => onDeleteParticipant(participant.id)}
                className="bg-red-500 hover:bg-red-600 text-xs px-2 py-1"
              />
            )}
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.total}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
      />
    </div>
  );
};

export default ParticipantsList;
