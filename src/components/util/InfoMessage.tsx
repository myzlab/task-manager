import React from 'react';
import { Message } from 'primereact/message';
import Image from 'next/image';

interface InfoMessageProps {
    html: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ html }) => {
    const content = (
        <div className="flex align-items-center">
            <Image
                src="/info.png"
                alt="Info"
                width={24}
                height={0}
                style={{ height: 'auto' }}
            />
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
