import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/ExplorePage';
import ProfilePage from '../pages/ProfilePage';
import Sign from '../components/sign/Sign';




function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<Sign />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
