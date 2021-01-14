import './App.css';
import React from "react"
import app from './firebaseConnect.js';
import PrivateChats from './PrivateChats.js';
import Login from './ConnectPage.js';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {BrowserRouter as Router,Switch} from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
export const auth = app.auth()
export default function App() {

  const [user] = useAuthState(auth);

  return (
    <Router>
      <Switch>
    <div className="App">
      <header>

      </header>
      <section>
      <Route path='/Friends' component={PrivateChats}></Route>
      <Route path='/Login' component={Login}></Route>
        {user ? <Redirect to={"/Friends"}/>: <Redirect to="/Login"/>}
      </section>
    </div>
    </Switch>
    </Router>
  );
}
