import React from 'react';
import { Route } from 'react-router-dom';
//import Home from '../pages/Home';
//import About from '../pages/About';

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Login = React.lazy(() => import('../pages/Login'));

export const MainRoutes = [
    <Route key="homeroute" exact path='/' component={Home} />,
    <Route key="aboutroute" exact path='/about' component={About} />,
    <Route key="loginpageroute" exact path='/login/:referrer?' component={Login} />,
];