import { Route, Routes } from 'react-router'
import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'
import { ProductForm } from './views/ProductForm/ProductForm'
import { ProductList } from './views/ProductList/ProductList'

function App() {
  return (
    <div className={'app-container'}>
      <Sidebar />
      <div className={'app-content'}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cadastro" element={<ProductForm />} />
          <Route path="/cadastro/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
