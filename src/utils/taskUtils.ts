import { EventInput } from '@fullcalendar/core';
import { Task, STATUS_COLORS } from '@/types/task';

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatDisplayDate(date: string, time: string): string {
  if (!date) return '';
  const d = new Date(`${date}T${time || '00:00'}:00`);
  if (time) {
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function taskToCalendarEvent(task: Task): EventInput {
  const hasTime = task.time !== '';
  return {
    id: task.id,
    title: task.title,
    start: hasTime ? `${task.date}T${task.time}:00` : task.date,
    allDay: !hasTime,
    backgroundColor: STATUS_COLORS[task.status],
    borderColor: STATUS_COLORS[task.status],
    extendedProps: { taskId: task.id },
  };
}
