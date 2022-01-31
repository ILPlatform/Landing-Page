import React from 'react';
import { Container } from 'reactstrap';

function NotAvailable() {
  return (
    <>
      <div className="filter mb-5 pt-5 text-center" />
      <Container>
        <h1 class="title text-center pt-5 display-1">
          <b>404</b>
          <br />
          <p class="error-msg">
            The page you requested could not be found. If you think this is a
            mistake please <a href="mailto:info@ilplatform.be">contact us</a>
          </p>
        </h1>
      </Container>
    </>
  );
}

export default NotAvailable;
