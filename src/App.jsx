
import { useState } from 'react';
import React from 'react';
import Home from './Home.jsx';
import AppComponent from './AppComponent.jsx';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/Notfound.jsx';
import Intro from './pages/Intro.jsx';
import {AuthProvider} from './AuthProvider.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'



function App() {
  const [selectedMediaType, setSelectedMediaType] = useState('video');
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    
      <Router>
        <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Intro
                setSelectedMediaType={setSelectedMediaType}
                setAudioEnabled={setAudioEnabled}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home
                  setSelectedMediaType={setSelectedMediaType}
                  setAudioEnabled={setAudioEnabled}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppComponent
                  selectedMediaType={selectedMediaType}
                  audioEnabled={audioEnabled}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;