import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faFileInvoice,
  faHandHoldingUsd,
  faMoneyBill,
  faMoneyCheck,
  faSignOutAlt,
  faTimes,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import {
  Nav,
  Badge,
  Image,
  Button,
  Accordion,
  Dropdown,
  Card,
} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';
import CompanyLogo from '../assets/img/team/compagny _logo.jpg';

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? 'show' : '';

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : '';

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className='d-flex justify-content-between align-items-center'
          >
            <span>
              <span className='sidebar-icon'>
                <FontAwesomeIcon icon={icon} />
              </span>
              <span className='sidebar-text'>{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className='multi-level'>
            <Nav className='flex-column'>{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = 'secondary',
      badgeColor = 'primary',
    } = props;
    const classNames = badgeText
      ? 'd-flex justify-content-start align-items-center justify-content-between'
      : '';
    const navItemClassName = link === pathname ? 'active' : '';
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className='sidebar-icon'>
                <FontAwesomeIcon icon={icon} />{' '}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className='sidebar-icon svg-icon'
              />
            ) : null}

            <span className='sidebar-text'>{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className='badge-md notification-count ms-2'
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      {/* <Navbar
        expand={false}
        collapseOnSelect
        variant='dark'
        className='navbar-theme-primary px-4 d-md-none'
      >
        {/* <Navbar.Brand
          className='me-lg-5'
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={ReactHero} className='navbar-brand-light' />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls='main-navbar'
          onClick={onCollapse}
        >
          <span className='navbar-toggler-icon' />
        </Navbar.Toggle> 
      </Navbar> */}
      <CSSTransition timeout={300} in={show} classNames='sidebar-transition'>
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className='sidebar-inner px-4 pt-3 '>
            <div className='user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4'>
              <div className='d-flex align-items-center'>
                <div className='user-avatar lg-avatar me-4'>
                  <Image
                    src={CompanyLogo}
                    className='card-img-top rounded-circle border-white'
                  />
                </div>
                <div className='d-block'>
                  <h6>Soroubat CI</h6>
                  <Button
                    as={Link}
                    variant='secondary'
                    size='xs'
                    to={Routes.Signin.path}
                    className='text-dark'
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className='me-2' /> Se
                    deconnecter
                  </Button>
                </div>
              </div>
              <Nav.Link
                className='collapse-close d-md-none'
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className='flex-column pt-3 pt-md-0'>
              {/* <NavItem
                title='Valsoria Impex'
                link={Routes.DashboardOverview.path}
                image={ReactHero}
              /> */}
              <div className='d-flex align-items-center mb-5'>
                <div className='user-avatar lg-avatar me-4'>
                  <Image
                    src={CompanyLogo}
                    className='card-img-top rounded-circle border-white'
                  />
                </div>
                <div className='d-block mt-4'>
                  <h6>Soroubat CI</h6>
                  <p
                    style={{
                      padding: 8,
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                    className='bg-blue'
                  >
                    300,000,000 FCFA
                  </p>
                </div>
              </div>

              <NavItem
                title='Dashboard'
                link={Routes.DashboardOverview.path}
                icon={faChartPie}
              />
              <NavItem
                title='Transactions'
                icon={faHandHoldingUsd}
                link={Routes.Transactions.path}
              />
              {/* <NavItem
                title='Settings'
                icon={faCog}
                link={Routes.Settings.path}
              /> */}
              <Dropdown.Divider className='my-3 border-indigo' />
              <NavItem
                title='Allocation de fonds'
                icon={faMoneyBill}
                link={Routes.Allocation.path}
              />
              <NavItem
                title='Paiement Salaire'
                icon={faMoneyCheck}
                link={Routes.Salary.path}
              />
              <Dropdown.Divider className='my-3 border-indigo' />
              <NavItem
                title='Portefeuilles'
                icon={faWallet}
                link={Routes.Wallet.path}
              />
              <CollapsableNavItem
                eventKey='reglements/'
                title='Reglements'
                icon={faFileInvoice}
              >
                <NavItem title='Dépenses Employés' link={Routes.Refunds.path} />
                <NavItem
                  title='Facture fournisseur'
                  link={Routes.SupplierInvoices.path}
                />
              </CollapsableNavItem>
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className='w-90 mt-8'
              >
                <Button variant='danger' className='w-full'>
                  Se déconnecter
                </Button>
              </Card.Link>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
