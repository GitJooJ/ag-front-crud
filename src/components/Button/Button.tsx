import { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

export const Button = ({ children, disabled, type }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} className='button'>
      {children}
    </button>
  )
}