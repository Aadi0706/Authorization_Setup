// import logo from './logo.svg';
import './App.css';
import {Login}  from './components/Login';
import {Home}  from './components/Home';
import {BriefIssue} from './components/BriefIssue';
import { NoPowerIssue } from './components/NoPowerIssue';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (

  <Router>
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/briefIssue/:caseId" element={<BriefIssue/>} />
    <Route path="/noPowerIssuse" element={<NoPowerIssue/>} />
  </Routes>
   </Router>
  );
}

export default App;
