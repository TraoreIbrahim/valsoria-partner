import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../routes';

// pages
import DashboardOverview from './dashboard/DashboardOverview';
import Transactions from './Transactions';
import Settings from './Settings';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Lock from './Lock';
import NotFoundPage from './NotFound';
import ServerError from './ServerError';

// components
import Sidebar from '../components/Sidebar';
import Preloader from '../components/Preloader';
import Allocation from './Allocation';
import Salary from './Salary';
import Wallet from './Wallet';
import Loan from './Refunds';
import Refunds from './Refunds';
import SupplierInvoices from './SupplierInvoices';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {' '}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{' '}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className='content'>
            {/* <Navbar /> */}
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar
      exact
      path={Routes.Transactions.path}
      component={Transactions}
    />
    <RouteWithSidebar
      exact
      path={Routes.Allocation.path}
      component={Allocation}
    />
    <RouteWithSidebar exact path={Routes.Salary.path} component={Salary} />
    <RouteWithSidebar exact path={Routes.Wallet.path} component={Wallet} />
    <RouteWithSidebar exact path={Routes.Refunds.path} component={Refunds} />
    <RouteWithSidebar
      exact
      path={Routes.SupplierInvoices.path}
      component={SupplierInvoices}
    />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
