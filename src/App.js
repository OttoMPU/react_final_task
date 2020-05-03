import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';

function App() {
  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
          </Typography>
        </Toolbar>
      </AppBar>

      <Trainingslist/>
    </div>
  );
}

export default App;
