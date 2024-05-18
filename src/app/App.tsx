import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/loginPage';
import RegistrationPage from '@/pages/registration-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
