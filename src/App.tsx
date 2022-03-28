import React from 'react';
import logo from './logo.svg';
import './App.scss';
import MainScreen from './screens/MainScreen';
import AppNavBar from './components/AppNavBar';

function App() {
  return (
    <div className="App">
      <AppNavBar />
      <MainScreen />
    </div>
  );
}

export default App;
