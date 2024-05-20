import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/loginPage';
import RegistrationPage from '@/pages/registration-page';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
