'use client';

import { useTaskContext } from '@/context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useTaskContext();

  const sorted = [...tasks].sort((a, b) => {
    // Sort by date asc, then time asc, then createdAt asc
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.time !== b.time) return a.time.localeCompare(b.time);
    return a.createdAt.localeCompare(b.createdAt);
  });

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No tasks yet</p>
        <p className="text-xs text-gray-400 mt-1">Click Add Task or a calendar date to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {sorted.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
