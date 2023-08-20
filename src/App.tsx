import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/FormPage';
import { ToastProvider } from './context/ToastContext';
import Dashboard from './components/Dashboard';
import RouteGuard from './utils/RouteGaurd';

const departments = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route
            path="/dashboard"
            element={
              <RouteGuard>
                <Dashboard departments={departments} />
              </RouteGuard>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
