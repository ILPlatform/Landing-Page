import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Styles
import 'bootstrap/scss/bootstrap.scss';
import 'assets/scss/paper-kit.scss';

// Components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Translate from 'components/Translate';

// Views
import Home from 'views/Home';
import Contact from 'views/Contact';
import ContactSuccess from 'views/ContactSuccess';
import About from 'views/About';
import NotFound from 'views/NotFound';
import Privacy from 'views/Privacy';
import Terms from 'views/Terms';

// Context API
import Store from 'Context';
import Programme from "./views/Programme";
import ProgrammeSub from "./views/ProgrammeSub";

ReactDOM.render(
  <Store>
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        
        <Route path="/about/" exact component={About}/>
  
        <Route path="/programme" exact component={Programme}/>
        <Route path="/programme/:id" exact component={ProgrammeSub}/>
        
        <Route path="/contact/" exact component={Contact}/>
        <Route path="/contact/success/" exact component={ContactSuccess}/>
        
        <Route path="/privacy" exact component={Privacy}/>
        <Route path="/terms" exact component={Terms}/>
        
        <Route path="/404/" exact component={NotFound}/>
        
        <Route path="/fr/" exact component={Translate}/>
        <Route path="/en/" exact component={Translate}/>
        <Route path="/nl/" exact component={Translate}/>
        
        <Redirect to="/404"/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  </Store>, document.getElementById('root'));

