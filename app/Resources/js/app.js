import React    from 'react';
import ReactDom from 'react-dom';

import history         from './helpers/history';
import { loadHandler } from './helpers/ajax';
import Layout          from './Layout';
import Page            from './Page';

function render(location) {
  const path = location.pathname.split('/').pop();
  let component;

  switch (path) {
    case 'whoswho':
      component = <Page page={2} onLoad={loadHandler} />;
      break;
    case 'projectology':
      component = <Page page={3} onLoad={loadHandler} />;
      break;
    default:
      component = <Page page={2} onLoad={loadHandler} />;
  }

  ReactDom.render((
    <Layout>{component}</Layout>
  ), document.getElementById('app'));
}

render(history.getCurrentLocation());
history.listen(render);
