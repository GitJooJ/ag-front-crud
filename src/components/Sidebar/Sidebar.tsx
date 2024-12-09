import { FaList } from 'react-icons/fa';
import { IoCreateOutline } from 'react-icons/io5';
import './Sidebar.css';
import { StyledNavlink } from './components/StyledNavlink';

export const Sidebar = () => {
  return (
    <div className={'sidebar'}>
      <img className={'logo'} src='../../ag-inverted.png' alt='logo' />
      <h1>C.R.U.D</h1>
      <nav className={'list'}>
        <StyledNavlink to='/' end label='Listagem' icon={<FaList />} />
        <StyledNavlink to='/cadastro' label='Cadastro' icon={<IoCreateOutline />
        } />
      </nav>
    </div>
  )
}