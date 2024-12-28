import React from 'react';
import { Message } from 'primereact/message';

interface InfoMessageProps {
    html: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ html }) => {
    const content = (
        <div className="flex align-items-center">
            <img alt="logo" src="/info.png" width="24" />
            <span
                className="ml-2"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );

    return (
        <Message
            severity="info"
            content={content}
        />
    );
};

export default InfoMessage;
