'use client';

import React, { createContext, useContext, useState } from 'react';
import { Task, TaskStatus, ModalOpenPayload } from '@/types/task';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/taskUtils';

interface TaskContextValue {
  tasks: Task[];
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  modalPayload: ModalOpenPayload | null;
  openModal: (payload: ModalOpenPayload) => void;
  closeModal: () => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [modalPayload, setModalPayload] = useState<ModalOpenPayload | null>(null);

  const addTask = (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const openModal = (payload: ModalOpenPayload) => setModalPayload(payload);
  const closeModal = () => setModalPayload(null);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, modalPayload, openModal, closeModal }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used inside TaskProvider');
  return ctx;
}
