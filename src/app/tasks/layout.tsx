'use client';

import React from 'react';
import './tasks.scss';
import { Button } from 'primereact/button';
import { useAuthService } from '@/services/auth-service';
import { useRouter } from 'next/navigation';

const TasksLayout = ({ children }: { children: React.ReactNode }) => {
  const { logoutUser } = useAuthService();
  
  const router = useRouter();
  const { token } = useAuthService();

  React.useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

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
