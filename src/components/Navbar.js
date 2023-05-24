import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { Context } from '../Context';
import useData from 'data';
import languages from '../data/languages.json';
import { v4 } from 'uuid';

const NavBar = () => {
  const [bodyClick, setBodyClick] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [state, dispatch] = useContext(Context);
  const data = useData()?.navigation;

  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        className="fixed-top pt-0 navbar-light"
        id="navbar-main"
        expand="lg"
      >
        <Container>
          <NavbarBrand id="navbar-brand" to="/" className="py-2" tag={Link}>
            <img
              src={require('assets/img/ILPlatform_Banner.png').default}
              style={{ height: '50px' }}
              alt="ILPlatform"
            />
          </NavbarBrand>
          <button
            className="navbar-toggler"
            id="navigation"
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
              setBodyClick(true);
              setCollapseOpen(true);
            }}
          >
            <span className="navbar-toggler-bar bar1"/>
            <span className="navbar-toggler-bar bar2"/>
            <span className="navbar-toggler-bar bar3"/>
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/about/">{data['about-us']}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/programme/">{data['programme']}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://stageo.ilplatform.be/" rel={"nofollow"}>{data['classes']}</NavLink>
              </NavItem>
              
              {/*<NavItem>*/}
              {/*  <NavLink href="/demo/">{data['demo']}</NavLink>*/}
              {/*</NavItem>*/}
              <NavItem>
                <NavLink href="/contact/">{data['contact-us']}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle color="default" caret nav>
                  {state.language.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  {languages.map((language) => (
                    <DropdownItem
                      key={v4()}
                      onClick={() =>
                        dispatch({ type: 'SET_LANGUAGE', payload: language })
                      }
                    >
                      {language.toUpperCase()}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
