import React    from 'react';
import ReactDom from 'react-dom';

import history         from './helpers/history';
import Layout          from './Layout';
import Page            from './Page';
import Login           from './Login';

function render(location) {
  const path = location.pathname.split('/').pop();
  let component;

  switch (path) {
    case 'login':
      component = <Login />;
      break;
    case 'whoswho':
      component = <Page page={2} />;
      break;
    case 'projectology':
      component = <Page page={3} />;
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
