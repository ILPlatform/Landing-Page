import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";

import { Context } from "../Context";
import useData from "data";
import languages from "../data/languages.json";
import { v4 } from "uuid";

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
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="fixed-top pt-0 navbar-light" id="navbar-main" expand="lg">
        <Container className="position-relative" style={{ height: "70px", width: "100%" }}>
          <NavbarBrand id="navbar-brand" to="/" className="position-absolute translate-middle py-2" tag={Link}>
            <img
              src={require("assets/img/ILPlatform_Banner.png").default}
              style={{ height: "50px", left: "50%" }}
              alt="ILPlatform"
            />
          </NavbarBrand>

          <button
            className="position-absolute navbar-toggler border-0 px-4"
            style={{ right: "0" }}
            id="navigation"
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setBodyClick(true);
              setCollapseOpen(true);
            }}
          >
            <span className="navbar-toggler-bar bar1" style={{ height: "1.5px" }} />
            <span className="navbar-toggler-bar bar2" style={{ height: "1.5px" }} />
            <span className="navbar-toggler-bar bar3 ml-0" style={{ height: "1.5px", width: "18px" }} />
          </button>

          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/about/">{data["about-us"]}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/programme/">{data["programme"]}</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href="/camps/">{data["classes"]}</NavLink>
              </NavItem> */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle color="default" caret nav>
                  {data["classes"]}
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  <DropdownItem href="/camps/">{data["classes_camps"]}</DropdownItem>
                  <DropdownItem href="https://stageo.ilplatform.be/catalogs/parascolaires-2024-2025">
                    {data["classes_para2425"]}
                  </DropdownItem>
                  <DropdownItem href="https://stageo.ilplatform.be/catalogs/products">
                    {data["classes_free"]}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/contact/">{data["contact-us"]}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle color="default" caret nav>
                  {state.language.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                  {languages.map((language) => (
                    <DropdownItem key={v4()} onClick={() => dispatch({ type: "SET_LANGUAGE", payload: language })}>
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
