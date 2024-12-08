import './Header.css';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className='header'>{title}</header>
  )
}