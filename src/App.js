import React from 'react';
import './App.css';
import Login from "./components/login/Login";
import Layout from "./components/layout/Layout";
import { Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Login />
      </Route>
      <Route path='/Layout'>
        <Layout />
      </Route>
    </div>
  );
}

export default App;
