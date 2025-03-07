import React from 'react';
import RouterConfig from './router/config/RouterConfig';
import { AuthProvider } from './context/AuthContext'; // AuthContext 경로
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <RouterConfig />
    </AuthProvider>
  );
}

export default App;
