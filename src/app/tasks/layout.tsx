'use client';

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import './tasks.scss';  // Si tienes estilos específicos
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth-slice';
import { useRouter } from 'next/navigation';

const TasksLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());

    router.push('/login');
};

  return (
    <div>
      <div className="header px-2">
        <div className="flex flex-1">

        </div>
        <div className="flex flex-1 justify-content-end">
          <Button
              label="Sign out"
              onClick={handleLogout}
            />
        </div>
      </div>
      <div className="content pb-2 px-5">
        {children}
      </div>
    </div>
    // <div className="tasks-layout">
    //   <header className="tasks-header">
    //     <h1>Task Manager</h1>
    //     <nav>
    //       <ul>
    //         <li><Link href="/tasks">Task List</Link></li>
    //         <li><Link href="/tasks/create">Create Task</Link></li>
    //       </ul>
    //     </nav>
    //   </header>

    //   <div className="tasks-content">
    //     {/* Renderiza los componentes hijos aquí */}
        // {children}
    //   </div>
    // </div>
  );
};

export default TasksLayout;
