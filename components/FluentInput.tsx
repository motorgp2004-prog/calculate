import React from 'react';

interface FluentInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

export const FluentInput: React.FC<FluentInputProps> = ({ isValid = true, className = '', ...props }) => {
  return (
    <div className="relative group w-full">
      <input
        className={`
          w-full bg-[#1e1e1e]/60 hover:bg-[#1e1e1e]/80 text-white 
          border border-[#ffffff15] border-b-[#ffffff50] 
          focus:border-b-[#60cdff] focus:bg-[#1e1e1e] 
          rounded-t-[4px] rounded-b-[4px] px-3 py-1.5 
          text-sm outline-none transition-colors duration-200
          placeholder-gray-500
          ${className}
        `}
        {...props}
      />
      {/* Visual focus underline animation could go here, but simple border-b change is cleaner for CSS-only */}
    </div>
  );
};