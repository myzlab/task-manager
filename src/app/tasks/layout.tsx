'use client';

import React from 'react';
import './tasks.scss';
import { Button } from 'primereact/button';
import { useAuthService } from '@/services/auth-service';

const TasksLayout = ({ children }: { children: React.ReactNode }) => {
  const { logoutUser } = useAuthService();

  return (
    <div>
      <div className="header px-2">
        <div className="flex flex-1">

        </div>
        <div className="flex flex-1 justify-content-end">
          <Button
              label="Sign out"
              onClick={logoutUser}
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
