import logo from './logo.svg';
//import './App.css';

import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from "./pages/CourseDetails";
import TasksPage from './pages/TasksPage';
import TimerPage from './pages/TimerPage';
import SchedulePage from './pages/SchedulePage';
import {PlannerProvider} from "./context/PlannerContext";
import Layout from './components/Layout';
import StatsPage from "./pages/StatsPage";

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
  return(
      <PlannerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element = {<RegisterPage />}/>
            <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="timer" element={<TimerPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="stats" element={<StatsPage />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </PlannerProvider>
      );
}

export default App;
