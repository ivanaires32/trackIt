import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastrar from './components/Login/Cadastro';
import Login from './components/Login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
