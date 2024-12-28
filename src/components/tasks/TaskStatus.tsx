import React from 'react';

interface TaskStatusProps {
    status: 'To do' | 'In Progress' | 'Completed';
}

const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => {
    let statusColor = '';
    let textColor = '';
    let bgColor = '';

    switch (status) {
        case 'In Progress':
            statusColor = 'border-blue-500';
            textColor = 'text-blue-500';
            bgColor = 'bg-blue-100';

            break;
        case 'Completed':
            statusColor = 'border-green-500';
            textColor = 'text-green-500';
            bgColor = 'bg-green-100';

            break;
        default:
            statusColor = 'border-gray-500';
            textColor = 'text-gray-500';
            bgColor = 'bg-gray-100';
    }

    return (
        <div className={`${statusColor} ${textColor} ${bgColor} border-1 flex p-1`}>
            <span className={`text-xs`}>{status}</span>
        </div>
    );
};

export default TaskStatus;
