'use client';

import { EventContentArg } from '@fullcalendar/core';

export default function EventContent({ eventInfo }: { eventInfo: EventContentArg }) {
  return (
    <div className="flex items-center gap-1 overflow-hidden px-1 w-full">
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: eventInfo.event.backgroundColor }}
      />
      <span className="text-xs font-medium truncate text-white leading-tight">
        {eventInfo.event.title}
      </span>
    </div>
  );
}
