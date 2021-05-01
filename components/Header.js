import React, { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import { isAuth, signout } from "../actions/auth";
import Router, { useRouter } from "next/router";
import NProgress from 'nprogress'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import '.././node_modules/nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <Link href="/signup">
                  <NavLink>SignUp</NavLink>
                </Link>
                <Link href="/signin">
                  <NavLink>SignIn</NavLink>
                </Link>
              </React.Fragment>
            )}
            {/* {console.log(JSON.stringify(isAuth()))} */}
            {isAuth() && (
              <NavItem>
                <Link href="/signin">
                  <a
                    onClick={() =>
                      signout(() => (window.location.href = "/signin"))
                    }
                  >
                    SinOut
                  </a>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role == 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name} 's Dashbord`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role == 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name} 's Dashbord`}</NavLink>
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
