import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary' | 'danger' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  variant,
  size,
  disabled,
  onClick,
  children,
}) => {
  const buttonClasses = `
    px-4
    py-2
    rounded
    font-medium
    ${
      variant === 'primary'
        ? 'bg-blue-500 text-white hover:bg-blue-700'
        : variant === 'secondary'
        ? 'bg-gray-500 text-white hover:bg-gray-700'
        : variant === 'danger'
        ? 'bg-red-500 text-white hover:bg-red-700'
        : variant === 'outline'
        ? 'border border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700'
        : ''
    }
    ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;