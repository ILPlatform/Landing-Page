import React, { useState } from 'react';
import {
  Button, Col, Container, Form, Input, InputGroup, Row, Modal, ModalHeader, ModalBody, ModalFooter, Spinner
} from 'reactstrap';
import useData from 'data';
import Social from './Social';
import './Footer.css'; // Import your custom CSS file
import firebase from 'firebase/compat/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import 'firebase/compat/firestore';

// Initialize Firebase with your project's configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyBivMgQF_uNn7gm9-UwSRkm1CBVimMrrRo",
  authDomain: "ilplatform.firebaseapp.com",
  projectId: "ilplatform",
  storageBucket: "ilplatform.appspot.com",
  messagingSenderId: "482052945832",
  appId: "1:482052945832:web:d80ac5ab412b3e82dfcf9d",
  measurementId: "G-SR7EQBVXCX",
});

// Get Firebase Functions from the specified region
const functions = getFunctions(app, 'europe-west1');

// Define your callable function for form submissions inside the component
const submitNewsletterSubscription = async (data) => {
  const functionRef = httpsCallable(functions, 'customers_e_create');
  try {
    const response = await functionRef(data);
    return response.data;  // Adjust based on your function's return structure
  } catch (error) {
    console.error("Error calling Firebase function:", error);
    throw error;
  }
};

function Footer() {
  const data = useData()?.navigation;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log('Submitting data:', formData);

      // Call the Firebase function with formData
      const response = await submitNewsletterSubscription({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        consent: "true" // Modify as needed
      });

      setSuccessMessage('Subscription successful!');
      console.log('Response from Firebase:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        toggleModal(); // Close modal after showing success message
      }, 1000);
    }
  };

  return (
    <footer className="footer footer-big footer-black">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <div className="links">
              <ul className="uppercase-links stacked-links text-center text-md-left">
                <li><p><a href="/">{data['home']}</a></p></li>
                <li><p><a href="/about/">{data['about-us']}</a></p></li>
                <li><p><a href="/camps/" rel={"nofollow"}>{data['classes']}</a></p></li>
                <li><p><a href="/contact/">{data['contact-us']}</a></p></li>
              </ul>
            </div>
          </Col>

          <Col md={4} className="text-center text-md-left">
            <div className="links">
              <ul className="uppercase-links stacked-links text-center text-md-left">
                <li><p>Bd du Régent 54A, <br />1000 Bruxelles</p></li>
                <li><p><a href="mailto:info@ilplatform.be">info@ilplatform.be</a></p></li>
                <li><p><a href="tel:+32 470 87 74 29">+32 470 87 74 29</a></p></li>
              </ul>
            </div>
          </Col>

          <Col md={4}>
            <div className="social-area text-center">
              <Social spacedOut={false} />
            </div>

            {/* Newsletter Button */}
            <Button color="primary" onClick={toggleModal}>
              Newsletter
            </Button>

            {/* Modal for Newsletter Subscription */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Subscribe to our Newsletter</ModalHeader>
              <ModalBody>
                <Form>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </InputGroup>
                </Form>
                {successMessage && <p className="text-success">{successMessage}</p>}
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="success" 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner size="sm" /> : 'Submit'}
                </Button>
                <Button 
                  color="danger" 
                  onClick={toggleModal} 
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        <hr style={{ borderColor: '#66615b' }} />
        <Row>
          <Col lg={7} sm={12} className="text-center text-lg-left">
            © {new Date().getFullYear()} Independent Learning Platform ASBL
          </Col>
          <Col className="links text-center text-lg-right" lg={5} sm={12}>
            <ul>
              <li className="px-2">
                <a href="/privacy/">{data['privacy']}</a>
              </li>
              <li className="pr-0">|</li>
              <li className="px-2">
                <a href="/terms/">{data['terms']}</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
