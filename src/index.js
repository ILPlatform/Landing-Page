import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Styles
import 'bootstrap/scss/bootstrap.scss';
import 'assets/scss/paper-kit.scss';

// Components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Translate from 'components/Translate';

// Views
import Home from 'views/Home';
import ContactUs from 'views/ContactUs';
import ContactSuccess from 'views/ContactSuccess';
import AboutUs from 'views/AboutUs';
import NotFound from 'views/NotFound';
import Privacy from 'views/Privacy';
import Terms from 'views/Terms';
import ClassType from 'views/ClassType';
import ClassDetails from 'views/ClassDetails';

// Context API
import Store from 'Context';
import Register from 'views/Register';
import RegistrationSuccess from 'views/RegistrationSuccess';
import RegistrationFailure from 'views/RegistrationFailure';
import ClassList from 'views/ClassList';
import ClassListOnline from 'views/ClassListOnline';
import axios from 'axios';
import ipapi from 'ipapi.co';
import NotAvailable from 'views/NotAvailable';
import DemoClasses from 'views/DemoClasses';
import DemoSuccess from 'views/DemoSuccess';

var callback = function (loc) {
  if (loc === 'BG') {
    ReactDOM.render(<NotAvailable />, document.getElementById('root'));
  } else {
    ReactDOM.render(
      <Store>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />

            {/* <Route path="/about-us/" exact component={AboutUs} /> */}

            <Route path="/classes" exact component={ClassType} />
            <Route path="/classes/:type" exact component={ClassList} />
            <Route path="/classes/online" exact component={ClassListOnline} />
            <Route path="/classes/:type/:id" exact component={ClassDetails} />
            <Route
              path="/classes/:classtype/:id/register"
              exact
              component={Register}
            />
            <Route
              path="/register-success/:uid"
              exact
              component={RegistrationSuccess}
            />
            <Route
              path="/register-failure/:uid"
              exact
              component={RegistrationFailure}
            />

            <Route path="/demo" exact component={DemoClasses} />
            <Route path="/demo/success" exact component={DemoSuccess} />

            <Route path="/contact-us/" exact component={ContactUs} />
            <Route
              path="/contact-us/success/"
              exact
              component={ContactSuccess}
            />

            <Route path="/privacy" exact component={Privacy} />
            <Route path="/terms" exact component={Terms} />

            <Route path="/404/" exact component={NotFound} />

            <Route path="/fr/" exact component={Translate} />
            <Route path="/en/" exact component={Translate} />

            <Redirect to="/404" />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Store>,
      document.getElementById('root')
    );
  }
};

ipapi.location(callback, '', '', 'country');
