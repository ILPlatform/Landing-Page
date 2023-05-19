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
import Products from 'views/Products';
import ClassDetails from 'views/ClassDetails';
import CampDetails from 'views/CampDetails';

// Context API
import Store from 'Context';
import ClassRegister from 'views/ClassRegister';
import RegisterSuccess from 'views/RegisterSuccess';
import RegisterFailure from 'views/RegisterFail';
import ClassList from 'views/ClassList';
import DemoClasses from 'views/DemoClasses';
import DemoSuccess from 'views/DemoSuccess';
import CampList from "./views/CampList";
import CampRegister from "./views/CampRegister";
import ParascolaireRegister from "./views/ParascolaireRegister";
import ParascolaireDetails from "./views/ParascolaireDetails";
import Programme from "./views/Programme";
import ProgrammeSub from "./views/ProgrammeSub";

const RedirectStageo = () => {
  window.location.href = 'https://stageo.ilplatform.be/';
  return null;
}

ReactDOM.render(
  <Store>
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        
        <Route path="/about/" exact component={About}/>
        <Route path="/about-us/" exact component={About}/>
  
        <Route path="/programme" exact component={Programme}/>
        <Route path="/program" exact component={Programme}/>
  
        <Route path="/programme/:id" exact component={ProgrammeSub}/>
        <Route path="/program/:id" exact component={ProgrammeSub}/>
        
        <Route path="/classes" exact component={RedirectStageo}/>
        <Route path="/products" exact component={RedirectStageo}/>
        <Route path="/classes/online" exact component={RedirectStageo}/>
        
        <Route path="/classes/camps" component={RedirectStageo}/>
        <Route path="/camps" exact component={RedirectStageo}/>
        <Route path="/camps/:id" exact component={RedirectStageo}/>
        <Route path="/camps/:id/register" exact component={RedirectStageo}/>
        <Route path="/camp" exact component={RedirectStageo}/>
        <Route path="/camp/:id" exact component={RedirectStageo}/>
        <Route path="/camp/:id/register" exact component={RedirectStageo}/>
        
        <Route path="/class" exact component={RedirectStageo}/>
        <Route path="/classes/:type" exact component={RedirectStageo}/>
        <Route path="/class/:id" exact component={RedirectStageo}/>
        <Route path="/classes/:type/:id" exact component={RedirectStageo}/>
        <Route path="/class/:id/register" exact component={RedirectStageo}/>
        <Route path="/classes/:classtype/:id/register" exact component={RedirectStageo}/>
        
        <Route path="/parascolaires/:id" exact component={ParascolaireDetails}/>
        <Route path="/parascolaires/:id/register" exact component={ParascolaireRegister}/>
        <Route path="/parascolaire/:id" exact component={ParascolaireDetails}/>
        <Route path="/parascolaire/:id/register" exact component={ParascolaireRegister}/>
        <Route path="/para/:id" exact component={ParascolaireDetails}/>
        <Route path="/para/:id/register" exact component={ParascolaireRegister}/>
        
        <Route path="/register-success" exact component={RegisterSuccess}/>
        <Route path="/register/success" exact component={RegisterSuccess}/>
        <Route path="/register-failure" exact component={RegisterFailure}/>
        <Route path="/register/failure" exact component={RegisterFailure}/>
        
        <Route path="/demo" exact component={RedirectStageo}/>
        <Route path="/demo/success" exact component={RedirectStageo}/>
        
        <Route path="/contact/" exact component={Contact}/>
        <Route path="/contact-us/" exact component={Contact}/>
        <Route path="/contact/success/" exact component={ContactSuccess}/>
        <Route path="/contact-us/success/" exact component={ContactSuccess}/>
        
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

