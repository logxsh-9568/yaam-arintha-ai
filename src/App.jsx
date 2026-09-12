import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import PoemDetails from './pages/PoemDetails';
import AIClassroom from './pages/AIClassroom';
import Quiz from './pages/Quiz';
import Debate from './pages/Debate';
import Progress from './pages/Progress';
import BharathiTimeline from './pages/BharathiTimeline';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:poemId" element={<PoemDetails />} />
              <Route path="/classroom" element={<AIClassroom />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/debate" element={<Debate />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/bharathi-timeline" element={<BharathiTimeline />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
