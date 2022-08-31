import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Student from './pages/Student.js';
import Addstudent from './pages/Addstudent.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Student} />
        <Route path="/add-student" component={Addstudent} />
      </Switch>
    </Router>
  );
}

export default App;
