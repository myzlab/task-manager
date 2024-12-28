import React from 'react';

interface InputErrorMessageProps {
  error?: string;
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <small className="p-error">{error}</small>;
};

export default InputErrorMessage;
