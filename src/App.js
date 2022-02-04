import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import PostDetails from './components/PostDetails';
import Profile from './components/Profile';

function App() {
  return (
    
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      
        <Route path="/posts" element={<Home/>} />
        <Route path="/posts/:id" element={<PostDetails/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
    </div>
    
  );
}

export default App;
