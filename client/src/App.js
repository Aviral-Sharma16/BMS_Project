import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

import "./stylesheet/alignments.css";
import "./stylesheet/custom.css";
import "./stylesheet/form-elements.css";
import "./stylesheet/sizes.css";
import "./stylesheet/theme.css";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
