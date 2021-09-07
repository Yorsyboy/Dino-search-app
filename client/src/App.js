import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Styles
import './assets/styles.scss';

// Components
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import DinoSearch from './components/DinoSearch';
import DinoBrowse from './components/DinoBrowse';
import DinoDetails from './components/DinoDetails';
import Favourites from './components/Favourites';

const App = () => {

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/search" component={DinoSearch} />
          <Route path="/browse/:name" component={DinoBrowse} /> 
          <Route path="/browse" component={DinoBrowse} />          
          <Route path="/dinos/:id" component={DinoDetails} />
          <Route path="/" exact component={DinoSearch} />
          <Route>
            <h1 className="title is-size-2">404 - Page not found</h1>
            <p>Apologies, you've hit a route we hadn't planned for.</p>
            <p>Go back to the <Link to="/">search page</Link> to start again</p>
          </Route>
        </Switch>      
      </Layout>
    </Router>
  )
};

export default App;