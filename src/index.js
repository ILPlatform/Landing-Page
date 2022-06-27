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
import CampsDetails from 'views/CampsDetails';

// Context API
import Store from 'Context';
import ClassRegister from 'views/ClassRegister';
import RegisterSuccess from 'views/RegisterSuccess';
import RegisterFailure from 'views/RegisterFail';
import ClassList from 'views/ClassList';
import DemoClasses from 'views/DemoClasses';
import DemoSuccess from 'views/DemoSuccess';
import CampsList from "./views/CampsList";
import CampsRegister from "./views/CampsRegister";
import ParascolairesRegister from "./views/ParascolairesRegister";
import ParascolairesDetails from "./views/ParascolairesDetails";

ReactDOM.render(
  <Store>
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        
        <Route path="/about/" exact component={About}/>
        <Route path="/about-us/" exact component={About}/>
        
        <Route path="/classes" exact component={Products}/>
        <Route path="/products" exact component={Products}/>
        <Route path="/classes/online" exact component={Products}/>
        
        <Route path="/classes/camps" component={CampsList}/>
        <Route path="/camps" exact component={CampsList}/>
        <Route path="/camps/:id" exact component={CampsDetails}/>
        <Route path="/camps/:id/register" exact component={CampsRegister}/>
        <Route path="/camp" exact component={CampsList}/>
        <Route path="/camp/:id" exact component={CampsDetails}/>
        <Route path="/camp/:id/register" exact component={CampsRegister}/>
        
        <Route path="/class" exact component={ClassList}/>
        <Route path="/classes/:type" exact component={ClassList}/>
        <Route path="/class/:id" exact component={ClassDetails}/>
        <Route path="/classes/:type/:id" exact component={ClassDetails}/>
        <Route path="/class/:id/register" exact component={ClassRegister}/>
        <Route path="/classes/:classtype/:id/register" exact component={ClassRegister}/>
        
        <Route path="/parascolaires/:id" exact component={ParascolairesDetails}/>
        <Route path="/parascolaires/:id/register" exact component={ParascolairesRegister}/>
        <Route path="/parascolaire/:id" exact component={ParascolairesDetails}/>
        <Route path="/parascolaire/:id/register" exact component={ParascolairesRegister}/>
        <Route path="/para/:id" exact component={ParascolairesDetails}/>
        <Route path="/para/:id/register" exact component={ParascolairesRegister}/>
        
        <Route path="/register-success" exact component={RegisterSuccess}/>
        <Route path="/register-failure" exact component={RegisterFailure}/>
        
        <Route path="/demo" exact component={DemoClasses}/>
        <Route path="/demo/success" exact component={DemoSuccess}/>
        
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

