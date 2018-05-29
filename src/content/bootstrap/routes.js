
// todo we need to update this so that all load data methods call the login function first then the others after
// todo we should have a generic function for this instead of faffing around with horrible promise hierarchy every time

import universityAllStepsPage from '../../content/containers/Pages/University/AllSteps';
import GDPRExamplePage from '../../content/containers/Pages/GDPRExample';
import NotFoundPage from '../../content/containers/Pages/NotFoundPage';
import LoginPage from '../../content/containers/Pages/LoginPage';

// NOTE - you should pass in cookies to any of the methods that
// load data from the server so that their requests are able to
// be user - related

// NOTE - THE PATH ATTRIBUTE IS USED AS A KEY IN THE APP FILE FOR THE ROUTES - THIS MEANS IT IS ASSUMED TO BE UNIQUE.
// IT IT IS NOT UNIQUE WE NEED TO DO SOMETHING ELSE AS THE KEY IN THE APP!!!!!

const university = 'Aristotle';

export default [
  {
    path: `/${university}/login`,
    exact: true,
    component: LoginPage,
  },
  {
    path: `/${university}/GDPRExample`,
    exact: true,
    component: GDPRExamplePage,
  },
  {
    path: `/${university}/`,
    exact: true,
    component: universityAllStepsPage,
  },
  {
    path: '*',
    component: NotFoundPage,
    // loadData: defaultLoadFunction,
  },
];
