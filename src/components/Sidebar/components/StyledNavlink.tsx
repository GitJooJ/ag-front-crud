import { ReactNode } from 'react';
import { NavLink } from 'react-router';
import './StyledNavlink.css';

interface StyledNavlinkProps {
  to: string;
  label: string;
  end?: boolean;
  icon: ReactNode;
}

export const StyledNavlink = ({ to, label, end, icon }: StyledNavlinkProps) => {
  return (
    <NavLink className={'navlink'} to={to} end={end}>
      {icon}
      <span className={'label'}>{label}</span>
    </NavLink>
  )
}