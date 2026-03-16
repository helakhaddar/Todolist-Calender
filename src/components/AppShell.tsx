'use client';

import Sidebar from './Sidebar/Sidebar';
import CalendarView from './Calendar/CalendarView';
import TaskModal from './Modal/TaskModal';

export default function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <CalendarView />
      </main>
      <TaskModal />
    </div>
  );
}
