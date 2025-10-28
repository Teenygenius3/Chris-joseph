import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ManageBooks from './pages/ManageBooks';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/manage-books" component={ManageBooks} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;