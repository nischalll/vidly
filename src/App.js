import React, { Component } from 'react';
import Movies from './components/Movies';
import {Route, Redirect, Switch} from 'react-router-dom';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <main className='container' style={{marginTop:50}}>
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
