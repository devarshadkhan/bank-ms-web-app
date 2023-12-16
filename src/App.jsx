import './App.css'
import Navbar from './_components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './_pages/Home/Home';
import HeaderNavbar from './_components/Navbar/Navbar';
import AddTransaction from './_pages/AddTransaction/AddTransaction';
import {Toaster} from "react-hot-toast"
function App() {

  return (
    <>
     <BrowserRouter>
     <Toaster
  position="top-center"
/>
     <HeaderNavbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/add-transaction" element={<AddTransaction />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
