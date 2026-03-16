'use client';

import { Task, TaskStatus, STATUS_BG, STATUS_LABELS } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';
import { formatDisplayDate } from '@/utils/taskUtils';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask, openModal } = useTaskContext();

  const handleStatusToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const nextStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    updateTask(task.id, { status: nextStatus });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const handleEdit = () => {
    openModal({ mode: 'edit', task });
  };

  return (
    <div
      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleEdit}
    >
      {/* Done checkbox */}
      <input
        type="checkbox"
        checked={task.status === 'done'}
        onChange={handleStatusToggle}
        onClick={(e) => e.stopPropagation()}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-gray-900 truncate ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </p>
        {task.date && (
          <p className="text-xs text-gray-500 mt-0.5">{formatDisplayDate(task.date, task.time)}</p>
        )}
        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BG[task.status]}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all flex-shrink-0 p-1 rounded"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
