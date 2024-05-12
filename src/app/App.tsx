import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/loginPage/ui/loginPage';

function App() {
  return (
    // <>Welcome to eCommerce Application!</>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
