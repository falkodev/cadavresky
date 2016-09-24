import React    from 'react';
import ReactDom from 'react-dom';

import history               from './helpers/history';
import { connectionHandler } from './helpers/ajax';
import Layout                from './Layout';
import Page                  from './Page';
import Login                 from './Login';
import Contact               from './Contact';

export default function render(location, isAdminLoggedIn=false) {
  const path = location.pathname.split('/').pop();
  let component;

  switch (path) {
    case 'login':
      component = <Login callbackParent={connectionHandler} />;
      break;
    case 'whoswho':
      component = <Page page={2} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'projectology':
      component = <Page page={3} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'zoo':
      component = <Page page={4} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'shop':
      component = <Page page={5} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'goodies':
      component = <Page page={6} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'wear':
      component = <Page page={7} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case 'adorn':
      component = <Page page={8} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case 'collaboratory':
      component = <Page page={9} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'buddies':
      component = <Page page={10} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case 'contact':
      component = <Contact />;
      break;
    default:
      component = <Page page={2} />;
  }

  ReactDom.render((
    <Layout>{component}</Layout>
  ), document.getElementById('app'));
}

render(history.getCurrentLocation());
history.listen(render);
