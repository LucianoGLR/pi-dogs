//Dependecies
import { Route, BrowserRouter, Routes } from 'react-router-dom'

// Components
import Detail from './pages/detail/detail';
import Form from './pages/form/form';
import Home from './pages/home/home'
import Landing from './pages/landing/landing';

// Styles
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route path='/home/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

