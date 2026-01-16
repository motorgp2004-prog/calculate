import React from 'react';

interface FluentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const FluentButton: React.FC<FluentButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 border shadow-sm active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#005FB8] hover:bg-[#005FB8]/90 text-white border-transparent shadow-[#00000030]",
    secondary: "bg-[#ffffff0f] hover:bg-[#ffffff15] text-white border-[#ffffff15] backdrop-blur-sm",
    danger: "bg-red-600/80 hover:bg-red-600 text-white border-transparent"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
};