import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/FormPage';
import { ToastProvider } from './context/ToastContext';
import Dashboard from './components/Dashboard';
import RouteGuard from './utils/RouteGaurd';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/dashboard" element={
            <RouteGuard>
              <Dashboard/>
            </RouteGuard>
          } />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
