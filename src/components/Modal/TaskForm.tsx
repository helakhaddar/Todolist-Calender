'use client';

import { useState, FormEvent } from 'react';
import { Task, TaskStatus, STATUS_LABELS } from '@/types/task';
import { useTaskContext } from '@/context/TaskContext';

interface TaskFormProps {
  mode: 'create' | 'edit';
  task?: Task;
  defaultDate?: string;
}

export default function TaskForm({ mode, task, defaultDate }: TaskFormProps) {
  const { addTask, updateTask, closeModal } = useTaskContext();

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [date, setDate] = useState(task?.date ?? defaultDate ?? '');
  const [time, setTime] = useState(task?.time ?? '');
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'todo');
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!title.trim()) {
      setTitleError('Title is required.');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!date) {
      setDateError('Date is required.');
      valid = false;
    } else {
      setDateError('');
    }

    if (!valid) return;

    if (mode === 'create') {
      addTask({ title: title.trim(), description, date, time, status });
    } else if (task) {
      updateTask(task.id, { title: title.trim(), description, date, time, status });
    }
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          maxLength={100}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional notes..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
        >
          {mode === 'create' ? 'Create Task' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
