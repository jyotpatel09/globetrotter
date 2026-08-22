import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-full transition-all font-label-md duration-200 outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-secondary focus:ring-2 focus:ring-secondary/50',
    secondary: 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-on-primary focus:ring-2 focus:ring-primary/50',
    ghost: 'text-primary bg-transparent hover:bg-primary/5 focus:ring-2 focus:ring-primary/30'
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-label-sm text-[12px]',
    md: 'px-6 py-2.5 text-label-md text-[14px]',
    lg: 'px-8 py-3.5 text-[16px]'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
