import React from 'react';

interface InputErrorMessageProps {
  error?: string; // Mensaje de error opcional
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null; // Si no hay error, no renderizamos nada
  }

  return <small className="p-error">{error}</small>;
};

export default InputErrorMessage;
