
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultPage from './Pages/ResultPage'
import Home from './Pages/Home'
import LoadingCart from './Pages/LoadingCart'



function App() {


 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<LoadingCart/>} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  )
}

export default App
