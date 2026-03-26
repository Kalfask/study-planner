//import logo from './logo.svg';
//import './App.css';

import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import TasksPage from './pages/TasksPage';
import TimerPage from './pages/TimerPage';
import SchedulePage from './pages/SchedulePage';
import Layout from './components/Layout';

function ProtectedRoute({children})
{
  const token = localStorage.getItem('token');
  if(!token)
  {
    return <Navigate to="/login"/>;
  }
  return children;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
