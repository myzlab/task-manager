import React from 'react';

interface LabelProps {
  htmlFor: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, isRequired = false, children }) => {
  return (
    <label htmlFor={htmlFor}>
      {children}
      {isRequired && <span className='ml-1' style={{ color: '#FF4D4F' }}>*</span>}
    </label>
  );
};

export default Label;
