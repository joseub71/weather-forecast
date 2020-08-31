import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Material-UI components
import Avatar from '@material-ui/core/Avatar';
import Home from '@material-ui/icons/Home';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// img Profile
import check_list from './images/userCreator.jpg';

// Pages
import Main from './components/main/Main.js';
import Search from './components/search/Search';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
 
    return (
      <div>
        <header>
         <Link
          variant="inherit"
          href="/"
          > 
            <Home style={{color: '#fff', fontSize: '2em', cursor: 'pointer'}}/>
          </Link>

          <Typography variant="h4" component="h4" align="center" style={{color: 'white'}}>
                    Prueba para ServiSenior
          </Typography>

          <Link
          variant="inherit"
          href="https://www.linkedin.com/in/jose-useche-9664b7152/"
          target="_blank"
          > 
            <Avatar alt="Jose Useche" src={check_list} />
          </Link>

        </header>
          
        <Router>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => <Main {...props} />}
              />
              <Route
                exact
                path='/search/:date'
                render={(props) => <Search {...props} />}
              />
            </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
