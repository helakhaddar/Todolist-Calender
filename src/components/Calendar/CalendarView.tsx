'use client';

import { useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg, EventDropArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { useTaskContext } from '@/context/TaskContext';
import { taskToCalendarEvent } from '@/utils/taskUtils';
import EventContent from './EventContent';

export default function CalendarView() {
  const { tasks, openModal, updateTask } = useTaskContext();

  const events = useMemo(() => tasks.map(taskToCalendarEvent), [tasks]);

  const handleDateClick = useCallback(
    (arg: DateClickArg) => {
      openModal({ mode: 'create', defaultDate: arg.dateStr });
    },
    [openModal]
  );

  const handleEventClick = useCallback(
    (arg: EventClickArg) => {
      const taskId = arg.event.id;
      const task = tasks.find((t) => t.id === taskId);
      if (task) openModal({ mode: 'edit', task });
    },
    [tasks, openModal]
  );

  const handleEventDrop = useCallback(
    (arg: EventDropArg) => {
      const taskId = arg.event.id;
      const startStr = arg.event.startStr;
      const newDate = startStr.split('T')[0];
      const newTime = arg.event.allDay ? '' : startStr.split('T')[1]?.slice(0, 5) ?? '';
      updateTask(taskId, { date: newDate, time: newTime });
    },
    [updateTask]
  );

  return (
    <div className="flex-1 h-full p-4 overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        eventDrop={handleEventDrop}
        height="100%"
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
        dayMaxEvents={3}
        nowIndicator={true}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
        }}
      />
    </div>
  );
}
