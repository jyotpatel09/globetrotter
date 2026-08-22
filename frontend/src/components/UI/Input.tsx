import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className = '', id, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full text-left">
        {label && (
          <label htmlFor={id} className="font-label-md text-label-md text-primary uppercase tracking-wider block">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="material-symbols-outlined absolute left-0 bottom-3 text-outline text-[20px] pointer-events-none">
              {icon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            className={`input-underline w-full font-body-lg text-body-lg text-on-surface ${
              icon ? 'pl-8' : ''
            } ${error ? 'border-b border-error focus:border-error' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-error font-label-sm text-[12px] mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
