import React from 'react';
import ReactDom from 'react-dom';

import history from './helpers/history';
import Layout from './Layout';
import WhosWho from './pages/WhosWho';
import Projectology from './pages/Projectology';
import Error404 from './pages/Error404';

function render(location) {
  const path = location.pathname.split("/").pop();
  let component;

  switch (path) {
    case 'whoswho':
      component = <WhosWho />;
      break;
    case 'projectology':
      component = <Projectology />;
      break;
    default:
      component = <WhosWho />;
  }

  ReactDom.render((
    <Layout>{component}</Layout>
  ), document.getElementById('app'));
}

render(history.getCurrentLocation());
history.listen(render);
