import cornerImage from '../../assets/corner.png';
import './Header.css';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className={'header-container'}>
      <header className={'header'}>{title}</header>
      <img src={cornerImage} alt={'corner'} className={'adornment'} />
    </div>
  )
}