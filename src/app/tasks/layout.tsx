'use client';

import React from 'react';
import './tasks.scss';
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
      <div className="content pb-5 px-5">
        {children}
      </div>
    </div>
  );
};

export default TasksLayout;
